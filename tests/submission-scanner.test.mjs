import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { matchInventoryRules } from "../scripts/submission-output-scanner.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const scannerCli = path.join(root, "scripts", "scan-submission-output.mjs");

const createFixture = (t) => {
  const directory = mkdtempSync(path.join(tmpdir(), "ruyuan-submission-scanner-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  return directory;
};

const writeFixtureFile = (directory, relativePath, content = "safe") => {
  const filePath = path.join(directory, relativePath);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, content);
  return filePath;
};

const runScanner = (outputDir) => spawnSync(process.execPath, [scannerCli, outputDir], {
  cwd: root,
  encoding: "utf8",
  windowsHide: true,
});

const assertRuleFailure = (result, ruleId, relativePath) => {
  assert.equal(result.status, 1, result.stdout || result.stderr);
  assert.match(result.stderr, /Submission scan failed:/);
  assert.match(result.stderr, new RegExp(`rule=${ruleId.replaceAll(".", "\\.")}`));
  if (relativePath) assert.match(result.stderr, new RegExp(relativePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
};

test("submission scanner regression fixtures", async (t) => {
  await t.test("missing output directory fails closed", () => {
    const directory = createFixture(t);
    const result = runScanner(path.join(directory, "missing"));
    assertRuleFailure(result, "scan.root-missing", ".");
  });

  await t.test("non-directory output root fails closed", () => {
    const directory = createFixture(t);
    const filePath = writeFixtureFile(directory, "not-a-directory.txt", "safe");
    const result = runScanner(filePath);
    assertRuleFailure(result, "scan.root-not-directory", ".");
  });

  await t.test("construction wording fixture fails", () => {
    const directory = createFixture(t);
    writeFixtureFile(directory, "assets/app.js", "const mode = '施工模式';");
    const result = runScanner(directory);
    assertRuleFailure(result, "text.draft.construction-mode", "assets/app.js");
    assert.match(result.stderr, /\[TEXT\] assets\/app\.js:1:/);
  });

  await t.test("known editorial framework phrases fail closed with redacted diagnostics", async (editorialTest) => {
    for (const [phrase, ruleId] of [
      [
        "優先放入能展現 AI、互動媒體、聲響或沉浸式經驗的作品",
        "text.editorial.priority-selection",
      ],
      [
        "每件作品都要回答：為什麼做、給誰用、如何互動、證據在哪裡",
        "text.editorial.case-evidence-checklist",
      ],
    ]) {
      await editorialTest.test(ruleId, () => {
        const directory = createFixture(editorialTest);
        writeFixtureFile(directory, "assets/app.js", `export default ${JSON.stringify(phrase)};`);
        const result = runScanner(directory);
        assertRuleFailure(result, ruleId, "assets/app.js");
        assert.doesNotMatch(result.stderr, new RegExp(phrase, "u"));
      });
    }
  });

  await t.test("Chinese placeholder wording fixture fails", () => {
    const directory = createFixture(t);
    writeFixtureFile(directory, "media/dashboard.svg", "<title>公開截圖佔位圖</title><text>公開截圖尚未提供</text>");
    const result = runScanner(directory);
    assertRuleFailure(result, "text.draft.placeholder-zh", "media/dashboard.svg");
    assertRuleFailure(result, "text.draft.not-provided", "media/dashboard.svg");
  });

  await t.test("legacy brand fixture fails", () => {
    const directory = createFixture(t);
    writeFixtureFile(directory, "llms.txt", "# Nextgen Portfolio");
    assertRuleFailure(runScanner(directory), "text.brand.legacy-nextgen", "llms.txt");
  });

  await t.test("dead anchor fixtures fail", async (anchorTest) => {
    for (const [anchor, ruleId] of [
      ["#graphic", "text.anchor.graphic"],
      ["#video", "text.anchor.video"],
      ["#photo", "text.anchor.photo"],
      ["#contact", "text.anchor.contact"],
    ]) {
      await anchorTest.test(anchor, () => {
        const directory = createFixture(anchorTest);
        writeFixtureFile(directory, "index.html", `<a href="${anchor}">legacy</a>`);
        assertRuleFailure(runScanner(directory), ruleId, "index.html");
      });
    }
  });

  await t.test("hidden case identifier fixtures fail", async (hiddenTest) => {
    for (const [value, ruleId] of [
      ["immersive-memory-map", "text.hidden.case-id"],
      ["沉浸式記憶地圖", "text.hidden.case-title"],
    ]) {
      await hiddenTest.test(ruleId, () => {
        const directory = createFixture(hiddenTest);
        writeFixtureFile(directory, "assets/app.js", `export default ${JSON.stringify(value)};`);
        assertRuleFailure(runScanner(directory), ruleId, "assets/app.js");
      });
    }
  });

  await t.test("hidden binary filenames fail from inventory only", async (binaryTest) => {
    for (const [filename, ruleId] of [
      ["mv-soft-preview.mp4", "inventory.hidden.mv-soft-preview"],
      ["mv-soft-640.webp", "inventory.hidden.mv-soft"],
      ["ph-after-420.avif", "inventory.hidden.ph-after"],
    ]) {
      await binaryTest.test(filename, () => {
        const directory = createFixture(binaryTest);
        writeFixtureFile(directory, path.join("media", "portfolio", filename), Buffer.from([0xff, 0x00, 0x80]));
        const result = runScanner(directory);
        assertRuleFailure(result, ruleId, `media/portfolio/${filename}`);
        assert.match(result.stderr, /\[INVENTORY\]/);
        assert.doesNotMatch(result.stderr, /scan\.text-decode-error/);
      });
    }
  });

  await t.test("restricted path fixture fails case-insensitively", () => {
    const directory = createFixture(t);
    writeFixtureFile(directory, path.join("Assets", "ReStRiCtEd-MeDiA", "evidence.bin"), Buffer.from([1, 2, 3]));
    assertRuleFailure(runScanner(directory), "inventory.restricted.directory", "Assets/ReStRiCtEd-MeDiA");
  });

  await t.test("known sensitive Power BI filename fails", () => {
    const directory = createFixture(t);
    writeFixtureFile(directory, "work-02-powerbi-screenshot.PNG", Buffer.from([1, 2, 3]));
    assertRuleFailure(runScanner(directory), "inventory.restricted.power-bi-source", "work-02-powerbi-screenshot.PNG");
  });

  await t.test("raw data extensions fail regardless of case", async (rawDataTest) => {
    for (const extension of ["pbix", "xlsx", "xls", "CSV", "tsv"]) {
      await rawDataTest.test(extension, () => {
        const directory = createFixture(rawDataTest);
        writeFixtureFile(directory, `exports/private.${extension}`, Buffer.from([1, 2, 3]));
        assertRuleFailure(runScanner(directory), "inventory.restricted.raw-data", `exports/private.${extension}`);
      });
    }
  });

  await t.test("local absolute paths fail without echoing sensitive content", () => {
    const directory = createFixture(t);
    const privatePaths = [
      String.raw`D:\Users\Private Person\secret.txt`,
      "C:/Users/Private-Person/secret.txt",
      "/Users/private-person/secret.txt",
      "/home/private-person/secret.txt",
    ];
    writeFixtureFile(directory, "assets/app.js", JSON.stringify(privatePaths));
    const result = runScanner(directory);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /rule=text\.local-path\./);
    assert.doesNotMatch(result.stderr, /Private Person|private-person|secret\.txt/i);
  });

  await t.test("Windows and POSIX separators match the same inventory rule", () => {
    const windowsRules = matchInventoryRules(String.raw`media\portfolio\MV-SOFT-420.WEBP`).map(({ ruleId }) => ruleId);
    const posixRules = matchInventoryRules("media/portfolio/MV-SOFT-420.WEBP").map(({ ruleId }) => ruleId);
    assert.deepEqual(windowsRules, ["inventory.hidden.mv-soft"]);
    assert.deepEqual(windowsRules, posixRules);
  });

  await t.test("uppercase text extensions and dependency-named chunks still receive high-signal rules", () => {
    const directory = createFixture(t);
    writeFixtureFile(directory, "LLMS.TXT", "Nextgen Portfolio");
    writeFixtureFile(directory, "assets/react-fixture.js", "Nextgen Portfolio");
    const result = runScanner(directory);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /\[TEXT\] LLMS\.TXT:/);
    assert.match(result.stderr, /\[TEXT\] assets\/react-fixture\.js:/);
  });

  await t.test("caption, web manifest, and source map text are scanned", () => {
    const directory = createFixture(t);
    writeFixtureFile(directory, "captions/example.vtt", "WEBVTT\n\n00:00.000 --> 00:01.000\nNextgen Portfolio");
    writeFixtureFile(directory, "site.webmanifest", JSON.stringify({ name: "Nextgen Portfolio" }));
    writeFixtureFile(directory, "assets/app.js.map", JSON.stringify({ sourcesContent: ["Nextgen Portfolio"] }));
    const result = runScanner(directory);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /\[TEXT\] captions\/example\.vtt:/);
    assert.match(result.stderr, /\[TEXT\] site\.webmanifest:/);
    assert.match(result.stderr, /\[TEXT\] assets\/app\.js\.map:/);
  });

  await t.test("CSS placeholder selector exception is occurrence-specific", () => {
    const safeDirectory = createFixture(t);
    writeFixtureFile(safeDirectory, "styles.css", "input::placeholder { color: currentColor; }");
    assert.equal(runScanner(safeDirectory).status, 0);

    const badDirectory = createFixture(t);
    writeFixtureFile(badDirectory, "assets/app.js", "const state = 'placeholder';");
    assertRuleFailure(runScanner(badDirectory), "text.draft.placeholder", "assets/app.js");
  });

  await t.test("diagnostics are deterministic and redact matched text", () => {
    const firstDirectory = createFixture(t);
    const secondDirectory = createFixture(t);
    for (const directory of [firstDirectory, secondDirectory]) {
      writeFixtureFile(directory, "z.txt", "施工模式");
      writeFixtureFile(directory, "a.txt", "Nextgen Portfolio");
    }
    const first = runScanner(firstDirectory);
    const second = runScanner(secondDirectory);
    assert.equal(first.status, 1);
    assert.equal(first.stderr, second.stderr);
    assert.ok(first.stderr.indexOf("a.txt") < first.stderr.indexOf("z.txt"));
    assert.doesNotMatch(first.stderr, /施工模式|Nextgen Portfolio/);
  });

  await t.test("clean fixture passes and binary contents are never decoded as text", () => {
    const directory = createFixture(t);
    writeFixtureFile(directory, "index.html", "<!doctype html><title>RU / YUAN</title>");
    writeFixtureFile(directory, "styles.css", "input::placeholder { color: currentColor; }");
    writeFixtureFile(directory, "media/safe-preview.mp4", Buffer.from("施工模式 Nextgen Portfolio", "utf8"));
    const result = runScanner(directory);
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /Submission scan passed:/);
    assert.match(result.stdout, /3 files inventoried, 2 text files scanned/);
  });
});
