# 現況與目標差距

## 2026-07-26 rights 與公開展示版判讀基準

- 已完成：schema v2、rights evidence registry、public redacted summary、蕭智仁於 2026-07-26 確認的 attestation、Suno credit、實際聲軌更正、純函式 audit、14 個 rights tests、private evidence scanner 與 pre-upload Pages gate。
- 申請者已確認：文字提示／reference image／特定電影或演員、現代文本未複製、Canva stock／template 缺席與實際無營利用途。
- Evidence 缺口：本輪找到 0 份原始生成紀錄、0 份 EML、0 份 Canva project／asset inventory；absence checks 目前依據 applicant attestation，不能誤寫成 private originals 已獨立查驗。
- 最新整合 Gate：`verified`／`approved`；targeted `check:publication` 實測 exit 0。Pages 仍會在每次 configure／upload 前重新執行 submission 與 publication gates。
- 此差距只處理 publication rights；使用者研究、教學適切性與學習成效仍是另一組未驗證缺口。
- **已收斂：** Admission public narrative 與 `admission-evidence.audit.js` 已分層，public components 不再接收完整稽核物件；validator 依 stable ID 同時核對兩層，scanner 對 submission output 增加公開施工／audit 語句規則。
- **已收斂：** `DataVisualizationSeries` 以不透明深色閱讀面隔離 mist／paper 中間幀，central theme endpoint 同步 field 與 navigation；`App` 的 `ResizeObserver` 修正 lazy content 造成的 deep-link 漂移。
- **最新自動驗證：** install／`doctor` exit 0；sound 18/18、rights 14/14、scanner 73/73；submission scan 132 files／25 text files、67 text rules／9 inventory rules，118 public files 為 0 missing／0 SHA-256 mismatch；`check:publication` exit 0／`verified / approved`。
- **最新 Browser 驗證：** 1280×800、768×900、390×844、320×720 均為 0 overflow、0 broken hashes、0 duplicate IDs、0 broken images與console 0 warning／0 error；四個代表性 deep links 約 95–112 px，dark／paper endpoints、行動 menu Escape／還焦通過。
- **仍有差距：** limited-use approval 不涵蓋商業用途或 private-original 查驗；`notValidated`、system reduced-motion、完整 Tab／Enter、screen reader／實機與 production field evidence 仍未完成。

- Admission Evidence Pass 已把首頁收斂為 11 段送審 IA：`#top` → `#sound-transition` → `#reviewer-path` → `#interactive-sound-learning` → `#pure-data-learning` → `#research-positioning` → `#selected-work` → `#collaboration` → `#learning-roadmap` → `#ai-workflow` → `#contact`。`#research-proposal` 只保留為相容錨點；`#selected-work` 內依序放《畫本》、既有資料視覺化／supporting cases、最後才是指定 MV。
- Pure Data、代表作品、合作、Roadmap、AI 與 final links 使用永久 section wrapper 加 lazy-loaded content；原有 motion、R3F、Web Audio、CaseStudyShowcase、reduced-motion、focus 與 error boundary 未因敘事收斂而移除。
- Web Audio 仍是最強可操作證據，保留 9 階段 signal flow 與可證明／不能證明邊界。Pure Data 現有約 63 秒 v0.2.1 MP4 與 poster，可核對四組模擬參數映射、Preset、Reset、Panic 與 meters；狀態仍是「學習中／可操作功能原型」「本機功能測試／尚待驗證」，且明示 AI 協作、可見本機路徑、`validated` 字樣與裁切限制。REAPER 仍只有安裝狀態，尚未形成作品。
- 《畫本》與《希望有羽毛和翅膀》已依申請者提供事實加入精簡公開卡片與經確認的 canonical YouTube 作品入口；仍不主張得獎、觀看成效或第三方角色／影像／音樂所有權，完整 credit、活動／課程紀錄、來源與 rights artifact 留在 audit 缺口。
- PR #6 已把 11 段 IA、三個 admission lazy chunks與 Pure Data MP4／poster deploy；run `30087568225` 只作歷史部署證據。最新整合 source 已通過本機 gates 與 Browser matrix，但仍是 Draft PR，current production fingerprint 尚待 merge／deploy 後另行核對。
- **驗證邊界：** Sound 18/18 支持 mapping／lifecycle，自動與 Browser 結果支持目前 build、anchors、theme、menu 與基本媒體閱讀；screen reader、真實 200% zoom、system reduced-motion、實機與多瀏覽器音訊仍需人工覆蓋，不以部分通過補成完整 WCAG／device 結論。

## 2026-07-23 判讀基準

- PR #5 已 merged；工作分支 `61ea9d8` 與 `main`／`695b520` tree 相同，最新 Pages run `29680534295` 成功。
- `pnpm run doctor` exit 0；draft build 為 initial JS 199833 gzip B／entry 181592 B／CSS 43688 B，submission build 為 initial JS 193737 gzip B／entry 160908 B／CSS 43688 B，lazy 3D closure 為 638680 raw／169383 gzip B。
- 新版自然、第一人稱繁體中文文案已在線上 bundle 出現；這輪只改 copy／labels／metadata，沒有 runtime、motion、styles 或 dependencies 差距。
- 當時 `pnpm run check:publication` 為 exit 1，共 11 個權利／attestation blockers；媒體 HTTP 200 不是 rights clearance。此 blocker 狀態已由 2026-07-26 PR #7 limited-use attestation／publication gate 基線取代。

## 優先級

- **P0：** 可能造成敏感資料外洩、誤導送審或正式建置失敗。
- **P1：** 明顯削弱研究可信度、案例完整性或可及性。
- **P2：** production、維護性與體驗品質改善。

## 差距矩陣

| 優先級 | 現況 | 風險／目標 | 建議 |
| --- | --- | --- | --- |
| P0 | Hamlet 已由蕭智仁於 2026-07-26 完成 limited-use attestation；最新整合 `check:publication` exit 0／`verified / approved`。Commercial use、ads、paywall、affiliate revenue、商業廣告與音樂發行仍不允許 | 未來若改變網站營利模式或影片用途，沿用本次核准會超出現有 Suno 條件與申請者聲明；Draft PR 的本機通過也不是 production publication approval | 保留 production workflow 的 pre-upload publication gate；任何營利／商業用途變更都先取得新授權、更新 manifest／attestation，再重新驗證 |
| P0 | GitHub Repository 為 public；tracked public／audit source、hidden／internal data、prompts、evidence docs、`docs/admission/*` 與 Git history可讀。Submission alias 只讓部分內容不進 bundle | 「不渲染／不進 `dist/`」可能被誤認為保密，後續加入原始測試、音訊工程或研究草稿會擴大暴露 | 由申請者決定 public repository scope；個資、原始測試、未核權利文件、AI transcripts、`.pd`／`.rpp`、原始錄音與研究草稿先放 private workbench。Public／audit split 是 bundle／敘事責任分層，不是 repository 保密層 |
| P0 | Power BI restricted screenshot 已移出 public；資料使用說明不支持公開分析結果，另行公開許可未取得，部分 measures 仍待核對 | 重新公開原圖或錯誤推論會造成隱私／研究誠信風險 | 維持 quarantine；只有另取得資料提供方明確許可後才重新評估，正式輸出必跑 submission scan |
| P1 | Web Audio 有可操作 prototype，但 `notValidated` | 旗艦證據仍無使用者理解／學習效果資料 | 執行 planned formative tasks，保留匿名紀錄、錯誤、口述理解與 limitation |
| P1 | Pure Data v0.2.1 MP4／poster 已進 public，可核對本機功能操作；但原始畫面含本機路徑、`validated` 與裁切區，初版有 AI 協作，Repository 沒有可公開 `.pd`、版本差異或獨立重建證據。REAPER 只有已安裝狀態 | 影片能證明功能紀錄，不足以證明獨立作者性、熟練度、使用者驗證或研究系統；現有影片亦有送審觀感與路徑揭露風險 | 優先重錄不含本機路徑／過強 validation 用語且完整框取的作品集版；同步補最小可獨立重建 Patch、signal flow、版本差異、錯誤／修正與反思。REAPER 完成最小 routing 與原創輸出前維持未形成作品 |
| P1 | 《畫本》與指定 MV 已有精簡公開卡片與經確認的 canonical YouTube 入口；前者仍缺完整活動／credit／權利 artifact，後者仍缺課程紀錄、cue sheet／完整公開授權 | 公開連結與申請者提供的作品事實可支持有限角色敘述，但不能視為競賽結果、觀看成效或第三方媒體所有權 | 維持摘要、角色、必要素材說明與限制；只有補齊可核對的 credit、來源、公開範圍與支持文件後才提高證據強度 |
| P1 | AI 文學故事 MV 已有可播放成片、雙語字幕、八幕畫面、可重跑 manifest、衍生 Prompt Template v1 與具名 applicant attestation；publication gate approved，形成性評估仍只有 planned protocol | Template v1 不是原始生成對話，applicant attestation 也不是已找到的八幕生成紀錄、原始 EML 或 Canva 專案；成片證據不等於教學有效 | 維持 `notValidated` 與 `usedForExistingVideo: false`；private originals 如日後取得應留在私人 evidence workspace；以另一文本試跑模板並保留版本紀錄，執行學生／教師任務後才寫結果 |
| P1 | 資料視覺化影片字幕／transcript 品質未人工確認 | 聽覺可及性與快速審查不足 | 檢查 YouTube captions，另提供同頁 transcript summary |
| P1 | `#contact` 現在提供可核對的 GitHub Pages 與 public Repository 連結；仍沒有公開 Email、CV、社群或研究計畫下載 | 已有真實外部出口，但不等於申請者已決定公開個資、履歷或完整研究文件 | 保留兩個已確認 URL；其他聯絡／下載只有在申請者提供並核對公開範圍後加入 |
| P1 | 最新 Browser 已覆蓋四個 viewport、anchors／IDs、overflow、broken images、四個 deep links、dark／paper endpoints、行動 menu Escape／還焦與console；screen reader、真實 200% zoom、system reduced-motion、實機與多瀏覽器音訊仍未覆蓋 | Current rendered evidence 支持 responsive／navigation／theme 基本契約，但不能證明完整 a11y、裝置或 audible-output contract | 補 VoiceOver／NVDA、200% zoom、system reduced-motion、實機與多瀏覽器音訊；保留失敗媒體與完整鍵盤流程的人工 spot check |
| P2 | 最新 draft 為 471 modules、initial JS gzip 200889 B／entry 180733 B／CSS 44315 B；submission 為 467 modules、192936 B／153704 B／44315 B。2026-07-17 Lighthouse 94／100 與 LCP 2651 ms仍是更早 fingerprint | Current build budget 不等於低階實機、GPU／耗電、production network 或 field performance | 保留 visibility-aware lazy／device gating 與 closure budget；若要引用目前效能，再跑 current Lighthouse，並以低階 Android／iOS 與 Pages URL 的 field evidence判斷是否簡化 shader scene |
| P2 | sound 自動測試已有 5 個 mapping 與 13 個 controller lifecycle tests；React controls、Escape、offscreen 與 live region 目前只有 rendered smoke evidence | 核心 AudioContext race／cleanup 可重跑，但 component UI regression 尚未自動化 | 若未來加入正式 browser test runner，再補 React interaction tests；不要依賴間接 Puppeteer dependency |
| P2 | 單頁 anchors | 獨立分享、case SEO、browser history 能力有限 | 只有確定有分享需求時再評估 router/static routes |
| P2 | Pages workflow 會在 push 到 `main` 或手動觸發，並在 configure／upload 前依序執行 submission 與 publication gates；最新整合已在本機通過兩個 gate，但沒有一般 PR CI、lint、formatter 或廣泛 tests | Draft PR 的本機通過不等於 deploy approval；缺少 PR-stage 自動驗證，錯誤仍可能在合併後才由 deploy job 攔截 | 評估加入不含部署權限的最小 Windows PR CI 與 a11y smoke tests，保留現有 production submission／publication gates |
| P2 | Canonical、`og:url` 與 JSON-LD URL 已統一為已確認的 GitHub Pages project URL；social preview 仍是 SVG，custom domain 尚未決定 | 基本 URL identity 已收斂，但部分分享平台的 SVG 相容性與未來網域遷移流程仍未完成 | 補 raster 1200×630；若改 custom domain，同步更新 canonical、Open Graph、JSON-LD、`llms.txt`、final links 與部署設定 |
| P2 | 2026-07-17 Lighthouse 已封存完整 artifact／source lineage；2026-07-19 copy 後又有 2026-07-24 admission-evidence、media、lazy section 與 metadata 變更，目前沒有對應的新 localhost 或 production／field 數據 | 舊分數只能說明當時的 motion 修復，不可包裝成目前網站效能 | 本輪 final source 穩定後才重跑；另以 Pages URL 保留 production lab／field 證據，並與 localhost 結果分開 |

## 已解決且應保留

- 11 段 Admission Evidence IA、早期證據導覽、旗艦 Web Audio、Pure Data 專段、四層研究構想、代表作品、合作、Roadmap、AI 與 final links 的 source 組合；舊 `#learning-trail` 已由 Pure Data 專段與 Roadmap 取代。
- `src/data/admission-evidence.js` public narrative、以 stable ID 對齊的 `src/data/admission-evidence.audit.js`，以及只依賴 public module 的共享 lazy-loaded `AdmissionEvidenceSections.jsx`；各段保留永久 wrapper、heading、Suspense、error boundary 與 deferred-ready hash settle。
- 行動版 section menu、Escape 關閉與 focus restore。
- 原型 start/stop、visibility/offscreen cleanup、不支援與錯誤 fallback。
- AudioContext resume cancel／timeout、graceful release、background immediate cleanup、context interruption 與 destroy 的可測 controller。
- 桌面六個高階導覽連結、Logo、行動 menu、鍵盤焦點交接與 active-target 邏輯仍保留；最新整合已通過四 viewport、fixed-nav deep links、dark／paper endpoints、行動 menu Escape／還焦與console 回歸。Screen reader、200% zoom、system reduced-motion、實機與多瀏覽器音訊仍待補。
- `notValidated`／`exploratory` 明確測試狀態與 validator enforcement。
- Hamlet delivery 已建立 manifest、SHA-256／bytes、WebVTT／逐字稿與 63 個 public assets 的可重跑 `audit:evidence`；這些完整性證據與發布權利分開治理。
- Hamlet Prompt Template v1 已以 `processDerived` 發布，明載不曾用來生成現有成片；原始 Prompt log 仍保留為外部缺口。
- Hamlet 形成性評估已建立 planned protocol，但不含參與者人數、日期、結果或成效；rights checklist 已於 2026-07-26 由申請者確認，這不會把形成性研究狀態升格為已驗證。
- hidden immersive case 文字由 `#portfolio-hidden` alias 隔離，media 保持空；13 個專用 placeholders、generator refs 與 captions 已移除，submission dev 舊 URL 404。
- submission-hidden case 的流程圖／媒體 completeness 項目已標為不適用並排除 `recommendedMissing`；這不改變空 media、alias 與 scanner 隔離。
- submission scanner 已拆成可注入 core／thin CLI，加入送審內部詞、成效／系統完成過度主張、unsupported proficiency、private evidence 與公開 audit／施工語句規則；最新整合為 67 text rules／9 inventory rules／73/73 fixtures。`#contact`、VTT、Web Manifest、source map 與獨立 `dist/` audit 仍在檢查範圍。
- R3F 已改用 lean canvas 與精準 constructor extend；遞迴 built-import budget 覆蓋 initial／完整 lazy closure 與單一 chunk，2026-07-23 closure 為 638680 raw／169383 gzip B，851 kB 歷史 warning 已關閉。
- `llms.txt`、favicon、social preview、index／Open Graph／Twitter／JSON-LD 與頁面 anchors 已改成蕭智仁聲響、互動與數位學習申請敘事；canonical／`og:url`／JSON-LD URL 使用已確認的 GitHub Pages project URL。Raster preview 與 custom domain 仍待後續決策。
- Power BI 實作日期已確認為 2026/06/11–06/12；實際資料與結果媒體移出 public，公開 conceptual SVG。
- draft/submission bundling boundary，而非 CSS 隱藏。
- mapping pure functions 與 Node tests。
- DOM-first Hero、R3F lazy/device gating/offscreen pause。
- GitHub Pages 相對 base、public asset `BASE_URL`、submission Pages audit、Windows build／Ubuntu deploy workflow與 PR #6 歷史成功部署；publication gate 已在 configure／upload 前接入 workflow，最新整合本機 submission／publication gates 均通過。Production HTTP 仍須在實際 merge／deploy 後核對，不能沿用 PR #6 fingerprint。
- 全站 `RootErrorBoundary`、首屏主要內容不再 mount-hide、行動 anchor 目標焦點與 fine-pointer custom cursor gating。
- Web Audio 第四個鍵盤控制、可讀 readout、starting／busy、3 秒 resume timeout 及 pending context cleanup。
- 320px 繁中 display heading 越界修正與暖紙主題 accent 對比 5.71:1；資料視覺化深色 reading surface、dark／paper endpoints 與 320×720 viewport 已在最新整合回歸通過。Print reading-surface 也會重設為紙色 tokens、visible overflow 與無 shadow，但真實列印仍待人工檢查。
- 長頁平台 scrollbar 已恢復並跟隨深色／暖紙 theme token；`body` 最小寬度修正曾在 320×568、375×812、1440×900 取得 0 global horizontal overflow，現階段保留為歷史 regression，不代填新 11 段 source 的結果。
- 有效 Git history、`origin` 與 `main` 已確認；PR #1–#7 均已 merged。本輪 Draft PR #9 已從最新 `main` 整合公開展示版與 PR #7 rights 基線，GitHub 回報 mergeable，且通過本機 gates／Browser QA；PR #8 維持原衝突狀態。Draft PR 不等於 merge、deploy 或 production publication approval。
- 生成式 AI 協作方法區段、Prompt 版本、三個實際失敗案例、`AI 協助／申請者負責／申請者尚需補強` 與人類最終責任揭露。
- 公開文案已改成自然、第一人稱的繁體中文，並清楚區分作者角色、方法、已有證據與未驗證限制；PR #5 只改 copy／labels／metadata，沒有移除既有 runtime、motion 或 visual system。
- submission-only Lighthouse harness 的跨程序鎖、stale-lock dead-PID 驗證、archive completion marker、canonical rollback／summary-last、完整受測 `dist`／source manifests、CLI transcript、完整 profile／environment fingerprint、freshness／runtime 驗證與 mobile／desktop 分流；Hero LCP、current-geometry first-load、scene fallback、前一輪離散主題對比、theme-aware nav、sound-pad ARIA、busy/live-region 與 pending-start 取消問題已修正。本輪再以 fixed viewport field 恢復可逆、可停留的深墨→暖灰→暖紙 scrub，並補齊 disclosure 兩向高度動畫。

## 建議里程碑

1. **研究證據：** 先完成 Web Audio 形成性測試並修訂 mapping rationale／限制；結果未出現前保持 `尚待驗證`。
2. **聲音作品：** Pure Data 已有 v0.2.1 本機功能測試影片；下一步是重錄公開安全版，並補最小可獨立重建 Patch、逐物件 signal flow、版本差異與失敗／修正紀錄。REAPER 完成基本 routing 與原創輸出後再決定是否納入送審證據。不可把 AI Patch、功能影片或已安裝軟體當成熟練度。
3. **支持案例：** 以另一部文學作品試跑 Hamlet Prompt Template v1 並保留失敗／修訂紀錄，執行學生／教師形成性任務；完成資料影片字幕。Power BI 只有另取得資料提供方明確許可後才重新評估真實結果展示。
4. **可及性：** 在已完成的鍵盤／viewport／contrast 基礎上，補 screen reader、真實 zoom、行動 touch、system reduced-motion 與多瀏覽器 Web Audio matrix。
5. **Submission hygiene：** 維持已完成的 hidden asset、scanner、metadata 與 dev filesystem 邊界；每次正式輸出仍執行 scanner 與獨立 `dist/` audit。
6. **Production：** 保留已完成的 limited-use rights／attestation 與 fail-closed workflow，整合完成後重跑 submission／publication gates，再決定 deploy。之後再決定 Email／CV／社群、raster preview、custom domain，並為目前 source 補裝置／field evidence、可追溯 submission artifact 與 Lighthouse。Canonical 已使用現有 Pages URL，不再列為未知值。

## 安全延伸點

- 首頁／案例文案改 `portfolio.js`；研究摘要改 `admission-research.js`；Pure Data／代表作品／合作／Roadmap／final links 的公開敘事改 `admission-evidence.js`，完整 evidence／validation／rights／limitations／requests 依 stable ID 改 `admission-evidence.audit.js`；AI 摘要改 `ai-workflow.js`。Hidden draft text 只改 `portfolio.hidden.js`，construction notes 只改 `portfolio.internal.js`。
- 新案例／媒體先讀 content authoring 與 adding-portfolio-work；不要直接新增 remote demo media。
- 新聲音 mapping 優先放純函式並加 tests；AudioContext 必須由 user gesture 啟動、具 stop/cleanup 與安全 gain。
- Pure Data 影片只能描述為 v0.2.1 本機功能測試與學習原型；不要把它或 REAPER 安裝狀態描述成獨立完成、熟練、驗證或研究成果。
- 不要把 `notValidated` 填成假 metrics；有證據才升為 `exploratory`／`validated`。
- 不把衍生 Prompt Template 回填成原始 Prompt log；`processDerived`、`specificationOnly` 與 artifact evidence 必須維持不同狀態。
- Hamlet 媒體、字幕、逐字稿或 derivative inventory 改動後先跑 `audit:evidence`；正式發布前另跑 `check:publication`，不可用 submission build 通過取代申請者權利簽核。
- 不要把 `restricted-media/` 路徑或原始檔搬進 `public/`。
- 任何放入 `public/` 的檔案都視為可公開；hidden project 保持空 media state，直到真實證據取得公開核准。
- 不把 `scan:submission` exit 0 當作唯一送審證據；另查 built wording、metadata 與 binary assets。
- 改 palette／繁中排版／資訊架構前，遵循對應 docs guardrails。
- 保持 Three scene lazy/progressive，使 DOM 文字仍是 LCP。

## 本次無法確認

最終申請敘事簽核、當年度官方申請要求、真實使用者測試、Hamlet 原始 Prompt log／生成紀錄／原始 EML／可編輯 Canva 專案、Pure Data 獨立重建／可公開 `.pd`／版本差異、REAPER 工程與原創輸出、《畫本》／指定 MV 的完整 credit／來源／第三方 rights artifact、Power BI 另行公開許可、Email／CV／社群、custom domain、analytics、screen reader、真實 200% zoom、system reduced-motion、實機、多瀏覽器音訊與 field performance 均不在目前可驗證證據中。Hamlet limited-use rights 已由蕭智仁具名確認，最新整合 publication gate exit 0，但不能延伸成 private originals 已查驗或研究成效；兩件代表作品的 canonical YouTube 入口也不能延伸成第三方權利所有。Final build、獨立 `dist/` inventory 與四 viewport Browser matrix已完成；Draft PR 尚未 merge／deploy，production HTTP／field 狀態仍待發布後核對。2026-07-17 Lighthouse 與較早 rendered evidence只代表各自當時的 source。
