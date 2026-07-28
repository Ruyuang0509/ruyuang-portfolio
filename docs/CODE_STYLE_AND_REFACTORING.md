# 程式碼風格與重構規範

更新日期：2026-07-28

本文件是後續人工與生成式協作共同使用的維護契約。它補充 `AGENTS.md`、`content-governance.md`、`visual-system.md` 與 `chinese-visual-system.md`，不取代其中的權利、內容與動效 guardrails。

## 1. 基本原則

1. 先證明問題，再修改；以 runtime consumer、DOM、build、test 與 artifact 證據判斷，不以檔名或行數猜測。
2. 同一事實只維護一個 canonical source；index、完整案例、metadata 可有不同長度，但不得各自發明事實。
3. 只在責任、DOM、互動與可及性真正相同時抽共用元件。
4. 不用十多個 boolean props 把不同責任硬塞進一個通用元件。
5. 保留公開 route、slug、hash anchor 與 asset URL；若需更名，先提供 alias／redirect 並加入 gate。
6. 不以 CSS 隱藏 private／draft 資料；submission 必須從 module graph 移除。
7. 不因「簡化」而刪除敘事導引、互動回饋與作者性 motion。
8. 不放寬 build、rights、submission 或 publication gate 來讓變更通過。

## 2. 命名

### JavaScript／React

- Component、class：PascalCase，例如 `ProjectIndexGrid`、`WebAudioSection`。
- 函式、變數、props：camelCase，例如 `projectData`、`activeSection`。
- boolean：使用 `is`、`has`、`can`、`should` 前綴。
- 元件內 handler：`handlePlay`、`handleKeyDown`；props callback：`onPlay`、`onClose`。
- Hook：`use` 前綴。
- 只有模組級不可變設定使用全大寫，例如 `SCROLL_INTERRUPTION_KEYS`。
- 不新增 `New`、`Final`、`Copy`、`2`、`v2` 等版本尾碼；以責任命名並移除舊版本。

### 公開技術名稱

- Web Audio API
- GitHub Pages
- Power BI
- Pure Data（Pd）
- REAPER
- 生成式 AI

程式識別名稱依 JavaScript 慣例，例如 `webAudioEngine`；公開 copy 使用上列正式名稱。

### URL、anchor 與 asset

- 使用 kebab-case。
- Project `id` 同時是案例 anchor 契約；不要另建相近 slug。
- 新 top-level section 先更新 `src/config/site.js`，再同步 HTML／`llms.txt`／source，並讓 `audit:site` 驗證。
- 相容入口列在 `compatibilityAnchors`，不得重算為第 12 個主 IA。
- Asset 名稱描述內容／用途；不使用 `final`、`latest`、`new` 或純版本尾碼。

## 3. 模組與 export

- 一個檔案對一個主要責任；小型私有 helper 留在使用它的模組。
- React page／section component 預設 export；同一 lazy chunk 聚合多個 section 時可使用 named exports，共享資料與純函式也使用 named export。
- 不為一行運算建立只被呼叫一次且沒有語意價值的 helper。
- 新增 export 前確認 consumer；移除 consumer 時同步移除 export。
- 新 source module 必須從 `main.jsx` 的 draft 或 submission graph 可達；`audit:quality` 會拒絕孤立模組。
- 大型、非首屏、可獨立 fallback 的 section 優先使用 `lazy()`；fallback 要保留必要 heading／anchor，mount 後需讓 hash settle 重新執行。

## 4. Component 邊界

抽 component 前逐項比較：

- DOM 語意是否相同。
- Props 是否是同一資料模型。
- Keyboard、pointer、ARIA 與 error fallback 是否相同。
- CSS surface 與 responsive 行為是否相同。
- 是否至少有兩個真實 consumer，或單一區塊已具有可獨立測試的責任。

案例：

- 圖片 source set、intrinsic dimensions 與 error fallback 共用 `ResponsiveImage`。
- 通用 case sections 可由 data 驅動；Power BI 因九章 IA 與版面責任不同，保留專屬 renderer。
- 不把一般 case 與 Power BI renderer 合併成充滿 layout flags 的單一巨型 component。

## 5. State、effect 與生命週期

- 可在 render 由 props／state 計算的值，不另存 state。
- Effect 只用於外部同步：listener、observer、timer、animation、media、AudioContext 或 browser state。
- 每個 setup 必須有對稱 cleanup：
  - `addEventListener` → `removeEventListener`
  - timer → `clearTimeout`／`clearInterval`
  - animation frame → `cancelAnimationFrame`
  - observer → `disconnect`
  - WAAPI／GSAP → cancel／kill
  - AudioNode → fade／disconnect；AudioContext → close
- Async media listener 要處理成功、error、abort、替換請求與 unmount。
- 不在 render 綁 listener，不保留沒有 consumer 的 debug flag 或 runtime `console.log`。
- `useMemo`／`useCallback` 必須有 reference stability、昂貴計算或 effect dependency 的明確理由。
- 陣列項目若由語意取用，使用 stable `key`，不要依賴 `[0]`／`[1]` 的位置。

## 6. Web Audio

- AudioContext 只能由明確 user gesture 建立／resume。
- 同一 engine instance 不重複建立 graph 或 MediaElementSource。
- start generation 必須能被較新的 start、stop、destroy、resume rejection／timeout 取消。
- oscillator、filter、gain、panner、compressor 與 context 都要在停止／失敗時清理。
- 不改變現有 mapping、safety range 或聲音結果，除非有可重現 bug與對應 test。
- 每次修改至少執行 `pnpm run test:sound`，並在 Browser 確認啟用、可操作、停止與 Escape。

## 7. CSS 與 design token

### Token 抽取條件

只有同一語意跨多個 consumer 重複時抽 token。現有主要類別：

- theme：`--theme-*`
- spacing／layout：`--space-*`、`--page-gutter`、`--content-width-*`
- typography：`--font-*`、`--leading-*`
- radius／border／shadow：`--radius-*`、`--border-*`、`--shadow-*`
- motion：`--motion-duration-*`、`--motion-easing-*`
- layer：`--z-*`
- control：`--control-hit-size`

不要把每個單次數值變成 `--padding2` 或 `--new-color`。

### Selector 與 override

- 優先 component class、semantic primitive 或局部 utility。
- 不以 `!important` 解決正常 specificity；先檢查 selector ownership 或改用局部 custom property。
- 不用固定 height、負 margin、translate 或 `overflow:hidden` 掩蓋內容尺寸問題。
- 橫向 gallery／storyboard 的局部 `overflow-x:auto` 是明確互動，不等同全頁 overflow 修正。
- Global focus 只定義可見 outline，不強制所有元件為相同 radius。
- z-index 使用既有層級；新增值前先畫出 nav、cursor、field、menu、content 的 stack。

### Responsive

- 主 layout breakpoint 以 Tailwind `md` 768px 為基準；只有元件需求或效能 gate 有證據時才新增其他閾值。
- 最小支援寬度 320px。
- 每個 breakpoint 變更檢查 320、390、768 與 desktop；確認 document overflow、局部 rail、長繁中、CTA 44px 與 menu。
- 桌面與行動不要複製完整內容；使用同一 DOM 加 layout／visibility 規則。

## 8. Motion preservation

修改前將 effect 分類：

- narrative guidance
- interaction feedback
- atmosphere／authorship
- decorative
- performance risk

預設保留前三類。只有 profiling 或可重現 accessibility／usability 問題才能移除；優先嘗試：

- 縮小 paint area。
- 使用 transform／opacity。
- lazy／intersection activation。
- mobile／low-power 降低複雜度。
- reduced-motion fallback。
- 降低更新頻率。

任何實質移除都要在 handoff 記錄證據、原 UX 角色與替代互動。全畫面 theme switch 的變更不授權刪除 Hero、card、custom cursor、sound feedback 或 section reveal。

## 9. 內容資料

### Canonical sources

- `src/config/site.js`：site identity、canonical／repository URL、11 段 IA、primary nav、compatibility anchor。
- `src/data/portfolio.js`：首頁與公開案例 narrative、index fields、roles、tools、testing、media metadata。
- `src/data/portfolio.internal.js`：draft-only construction／readiness note。
- `src/data/admission-research.js`：申請階段研究構想。
- `src/data/admission-evidence.js`：公開代表作品／Pure Data／合作／roadmap／final links。
- `src/data/admission-evidence.audit.js`：draft-only 完整 audit evidence。
- `src/data/ai-workflow.js`：AI／作者性。
- `docs/evidence/*`：Hamlet evidence、rights 與 attestation。

Renderer 不另寫專案專屬摘要、工具、權利結論或流程版本。通用 UI 標籤、ARIA 操作詞與 Previous／Next 可以留在 component。

### 主張邊界

始終分開：

- 已完成 artifact。
- 流程／規格產出。
- `exploratory` 或 `notValidated` outcome。
- future research direction。
- public reachability。
- publication rights approval。
- private-original availability。

Limited-use 不得改寫為一般商用核准；deployment success 不等於 research validation 或 rights clearance。

## 10. Media

新增圖片需包含：

- local path，不使用遠端 demo CDN。
- 真實 alt。
- width／height。
- 適當 AVIF／WebP srcset。
- 首屏以下 `loading="lazy"`／`decoding="async"`。
- 穩定 aspect ratio 與 error fallback。

刪除前必須證明 source、CSS、Markdown、metadata、dynamic path、generator 與 build artifact 都無引用。先執行 `pnpm run audit:media`；不確定就記錄，不刪除。

`public/` 會被 Vite 原樣複製到 `dist/`。未被 React 引用的 public file 仍是公開輸出負擔，所以每輪要獨立比對 public／dist inventory。

## 11. Dependency

- 新增套件前先證明原生 API 或既有 dependency 無法合理完成。
- 不新增 paid GSAP plugin。
- 不使用 `latest`；使用和 lockfile 相容的明確 semver range。
- 移除套件前搜尋 import、script、config、build plugin、tests 與 docs workflow。
- `pnpm install --frozen-lockfile` 必須通過；不要只靠本機 `node_modules`。

## 12. Gate 與交付順序

每輪至少：

```powershell
pnpm install --frozen-lockfile
pnpm run workspace:check
pnpm run audit:quality
pnpm run audit:site
pnpm run audit:media
pnpm run audit:text
pnpm run audit:cjk
pnpm run audit:evidence
pnpm run content:check
pnpm run test:sound
pnpm run build:draft
pnpm run check:submission
pnpm run check:publication
```

高風險互動另做 production preview Browser smoke：

- 1440×1000、768×900、390×844、320×720。
- internal anchors、cold deep links、duplicate IDs、broken images、global overflow、console。
- mobile menu Escape／focus restore。
- Storyboard keyboard／seek。
- Web Audio user-gesture start／stop／Escape。

交付前執行 `git diff --check`、`git status --short --branch` 與 fresh `dist/` inventory。沒有實際執行的項目要明確列為未驗證。
