import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import {
  INVENTORY_RULES,
  TEXT_RULES,
  scanSubmissionOutput,
} from "./submission-output-scanner.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);

if (args.length > 1) {
  console.error("Submission scan failed: expected zero or one output-directory argument.");
  process.exitCode = 1;
} else {
  const outputDir = args[0] ? path.resolve(process.cwd(), args[0]) : path.join(root, "dist");
  const result = scanSubmissionOutput({ outputDir });

  if (!result.ok) {
    console.error(`Submission scan failed: ${result.findings.length} finding(s).`);
    for (const finding of result.findings) {
      const location = finding.line ? `:${finding.line}:${finding.column}` : "";
      const errorCode = finding.errorCode ? ` code=${finding.errorCode}` : "";
      console.error(`- [${finding.kind.toUpperCase()}] ${finding.relativePath}${location} rule=${finding.ruleId}${errorCode}`);
    }
    process.exitCode = 1;
  } else {
    console.log(
      `Submission scan passed: ${result.counts.inventoriedFiles} files inventoried, ` +
      `${result.counts.scannedTextFiles} text files scanned, ` +
      `${TEXT_RULES.length} text rules and ${INVENTORY_RULES.length} inventory rules enforced.`,
    );
  }
}
