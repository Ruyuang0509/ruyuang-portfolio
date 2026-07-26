# Current State

## 2026-07-26 Hamlet rights applicant confirmation

- Working branch：`codex/hamlet-rights-attestation`，起點 `e8f35e0d73d1a314785f243230201f9d92a4f25b`。原 canonical worktree 的既有未提交變更未被覆蓋。
- Hamlet manifest 為 schema v2；Suno 特定非營利條件、Song ID、00:00–00:40、公開 credit 與 supplied EML digest 已記錄。原始 EML 本輪未找到，完整生成對話與郵件仍必須留在 private evidence workspace。
- 蕭智仁於 2026-07-26 明確確認場景生成、文學來源排除、Canva stock／template 缺席與目前無營利用途；`rightsReview.status = verified`、`publicationGate = approved`、`applicantAttestation.confirmed = true`，並綁定既有影片 SHA-256。
- Pages build 依序執行 `check:submission` → `check:publication` → Configure Pages → upload；只有兩個 gate 都通過才會建立 artifact 並 deploy。
- 公開頁已揭露 Suno 歌曲實際包含英語歌詞與人聲，雙語 WebVTT 仍是故事敘事字幕。11 段 IA、Hero、motion 與 `testing.statusKey: notValidated` 不變。
- Phase B final verification：完整 `doctor`、14/14 rights tests、58/58 scanner fixtures、18/18 sound tests、content check、draft／submission builds、Pages audit 與 `check:publication` 均 exit 0。In-app Browser 在 1280×720、768×1024、375×812、320×568 核對 confirmed disclosure、Suno focus、影片 keyboard play／pause、8 幕、2 tracks、responsive width 與 clean-tab console；待本人確認、舊權利卡片、duplicate ID、broken case target 與 global overflow 均為 0。本機仍找到 0 份原始生成紀錄與 0 份原始 EML，Canva 可編輯專案也未找到，因此 applicant attestation 與獨立原始證據必須繼續分層描述。

## 2026-07-24 11 段申請 IA 與 Pure Data 證據同步（本機自動驗證完成；互動式 Browser 未執行）

- 本節描述目前共享工作樹的 source 與最終本機自動驗證狀態；下方 Admission Evidence Pass 的舊 bundle、`dist/` 與 browser 數字保留為改版前歷史快照，不能取代本節的現行結果。
- 高階閱讀順序已接為：`#top` Hero → `#sound-transition` 問題意識 → `#reviewer-path` 證據導覽 → `#interactive-sound-learning` Web Audio → `#pure-data-learning` Pure Data → `#research-positioning` 研究構想 → `#selected-work` 代表作品 → `#collaboration` 專案與合作 → `#learning-roadmap` 學習路線 → `#ai-workflow` AI／作者性 → `#contact` 研究方向與連結。`#selected-work` 內依序放《畫本》、既有資料視覺化與支持案例、最後才是指定 MV；這些細節不另列為高階申請路徑。
- `#research-proposal` 保留為 `#research-positioning` 內的向後相容 alias；Navbar 使用問題意識、Web Audio、Pure Data、研究構想、代表作品、學習路線六個高階入口，`public/llms.txt` 則列出完整 11 個錨點。
- Hero 現為「116學年度研究所申請作品集｜聲響、互動與數位學習」，並以「現就讀／預計 2026 年畢業」描述申請者狀態；不可沿用下方歷史快照中的「2026 年畢業於」敘述，除非申請者另行確認。
- Pure Data v0.2.1 的真實公開證據為 `public/media/portfolio/pd-crossmodal-mapping-v0.2.1-operation-demo.mp4`，poster 為同目錄的 `pd-crossmodal-mapping-v0.2.1-operation-demo-poster.png`。頁面只稱約 63 秒本機功能測試，可核對四組模擬參數、Preset、Reset、Panic 與輸出監看；Patch 原檔仍不公開，初版有 AI 協作，也不主張申請者已能獨立完成整套系統。
- 原始影片介面含 `validated` 字樣，但公開敘事一律解讀為「本機功能測試」，不是使用者、學術或研究驗證。影片畫面仍可見本機 D 槽專案路徑，且部分右側 Preset 與下方 Patch 區塊超出錄影邊界；這些是正式送審前仍需處理的公開與觀看限制。
- `#selected-work` 的內部順序固定為《畫本》→ 其他可驗證作品（AI 文學故事 MV、資料視覺化、Power BI）→《希望有羽毛和翅膀》個人 MV 混剪。《畫本》與個人 MV 的文字型新案例已存在，但目前只有申請者提供的角色／情境文字，沒有公開成片或可逐項核對連結；不得把參賽寫成得獎，也不得把第三方角色、影像或音樂寫成原創。
- `#research-positioning` 只呈現申請階段的混合監聽構想，分開問題、初步配置、可帶入能力與入學後補強；沒有已完成多聲道系統、聲學量測、心理聲學結果或指導教授認可。`#ai-workflow` 仍分開 AI 協助、申請者決策與尚需補強，不把 AI 生成 Patch 或程式完整度等同作者熟練度。
- `#contact` 只公開目前作品集與 public GitHub Repository。私人研究工作區內確有研究計畫 DOCX，但尚未形成核准的公開審閱版；其中的文獻、設備、樣本、預算、倫理與 metadata 仍需逐項核對，因此目前沒有公開下載，也不得把私人檔案存在誤寫成可公開或已驗證。Metadata 已改為 `蕭智仁｜聲響、互動與數位學習作品集`，canonical／Open Graph URL 為 `https://ruyuang0509.github.io/ruyuang-portfolio/`。
- 本輪最終本機自動驗證為：`pnpm run doctor` exit 0；scanner fixtures 57/57、inventory rules 7；draft build 470 modules、submission build 467 modules；fresh `dist/` 132 files／25 text files、`public/` 118 files，public→dist 0 missing／0 hash mismatch。`pnpm run check:publication` exit 1，仍有 11 個 Hamlet rights／attestation blockers。
- 互動式 in-app Browser 已嘗試，但本機連線隔離使 Browser 無法連線，即使 shell 端 localhost HTTP 回 200 也不能建立互動工作階段。因此四個要求 viewport，以及 anchor／focus、Web Audio、Pure Data video、reduced-motion、horizontal overflow 與 console 檢查均未能執行；本輪不得把任何一項列為通過。

## 歷史快照 — 2026-07-24 Admission Evidence Pass

- 本節取代下方 2026-07-23 的「目前」source、內容、IA、working tree 與驗證敘述；舊區塊保留為歷史快照。
- Hero 已改為本輪使用者指定的國立臺南藝術大學 116 學年度申請語境，交代蕭智仁、2026 年國立嘉義大學數位學習設計與管理學系畢業，以及數位學習／視覺敘事到聲音互動／空間監聽的轉向。官方系所名稱、簡章、時程與格式仍需申請者核對。
- 實體順序為研究定位 → Web Audio 可操作證據 → Pure Data／REAPER 學習軌跡 → 代表作品 → 混合監聽與視覺化校準研究構想 → 補充能力脈絡 → AI／作者性 → 送審閱讀出口。新增 `#research-proposal`；既有案例 ID、R3F、GSAP／Lenis、Custom Cursor、聲音 lifecycle、樣式與媒體未移除。
- Web Audio 已補 9 階段 signal flow、`可操作原型／尚待驗證` 與「可證明／申請者與 AI 分工／不能證明」邊界。Pure Data 只記錄 2026/07/24 開始、AI 曾協助現有 Patch、正逆向拆解；REAPER 只記錄已安裝、尚未系統練習。
- 當時 Repository／history 沒有可核對的《畫本》、MV remix、`.pd`、`.rpp` 或可歸屬聲音輸出，因此該輪採「不新增案例」決策。這項歷史決策已被較新的申請者事實與選件決策取代：目前《畫本》與個人 MV 的文字型案例已存在，但公開成片、逐項 credit／rights 與原始聲音工程檔仍未提供。
- GitHub Repository 已唯讀確認為 public。Submission alias 只控制 bundle，不能讓 tracked hidden／internal／prompt 原始碼變私密；`docs/admission/*` 目前只在本機 working tree，若未來 commit／push 也會落入 public Git 邊界。
- Hamlet publication gate 保留；本輪沒有改 visibility、rewrite history、停止 Pages、完成 attestation、commit、push、PR 或 deploy。
- 當時工作樹的 `pnpm run doctor` exit 0：workspace、media、text、CJK、evidence、5 件 content、18/18 sound、draft build、51/51 scanner fixtures、submission build、54 text／6 inventory rules與 Pages audit 均通過。當時 draft 為 469 modules、initial JS 200294 gzip B、entry 182055 B、CSS 43775 B；submission 為 466 modules、initial JS 194092 gzip B、entry 161193 B、CSS 43775 B；lazy 3D closure 638680 raw／169383 gzip B。
- 第一個 draft build 曾因 entry 191880 B 超過 184320 B 預算而 exit 1；未提高預算，改把研究構想與 AI／作者性各自拆成 lazy chunk，加入永久 anchor wrapper、deferred fragment settle 與 section error boundary 後，以上 final gate 通過。
- Fresh `dist/` 為 129 files／24 text files；116 個 `public/` 檔案在 `dist/` 內 0 missing／0 SHA-256 mismatch，restricted／hidden／local path 文字為 0、unsafe filename 為 0。指定 116 學年度、Hero、研究聲明、signal flow 與 AI 分工字串存在；兩個舊定位字串為 0。
- In-app Browser 於 1440×900 與 375×812 重驗：實體 section 順序、6 個導覽標籤、88 個 hash links、深連結、桌面 Enter、行動 menu／Escape 還焦、固定導覽下 96 px 定位、Web Audio 啟用／Escape 停止均通過；兩組 viewport 都是 0 horizontal overflow、0 duplicate ID、0 broken anchor、0 broken image，console warning／error 為 0。
- `pnpm run check:publication` 仍按設計 exit 1，共 11 個 Hamlet rights／attestation／evidence reference blockers。這是正式 publication blocker，不是本輪應繞過的測試失敗。

## 2026-07-23 公開文案更新與文件再打包

- 本節取代下方 2026-07-18 快照中的「目前」Git、部署、建置與內容敘述；較早段落保留為實作歷程，不應當成最新狀態。
- 本輪先唯讀核對 repository、public data、component labels、metadata、Git／PR、Actions／Pages、正式站資產與 publication gate，再只更新 Markdown 文件。網站 source、styles、media、workflow、dependencies 與 runtime 行為均未修改。
- 公開文案已改為較自然的第一人稱繁體中文：首頁定位為「研究所作品集／聲響、互動與學習」，並用「我做了什麼、如何操作、目前證據、不能推論什麼」描述四件公開案例。這次 source delta 沒有改動 hash IA、案例 ID、Web Audio、R3F、GSAP／Lenis、樣式、動效或 binary media。
- 目前 working branch／remote 為 `codex/public-copy-rewrite`／`61ea9d8`；`main`／`origin/main` 為 PR #5 merge commit `695b520`。兩者 tree hash 相同、`git diff --quiet HEAD main` exit 0，內容沒有差異；ahead／behind 的 1／6 是 merge history 分岔，不是未合併內容。PR #1–#5 均已 merged。
- 最新 Pages run `29680534295` 對應 `695b520`，build／deploy 均 success。2026-07-23 實測正式首頁、新版 bundle、Hamlet MP4、英文與繁中 VTT、poster 均 HTTP 200；production bundle 含新版首頁與 AI 說明文案，不含舊首頁介紹。由於本次未認證 Pages-site endpoint 回 404，本輪不把 API `built` 欄位列為重新確認事實；Actions deployment 與公開 URL 可達性則已獨立確認。
- Fresh `pnpm install --frozen-lockfile` 與 `pnpm run doctor` 均 exit 0：5 件內容、18/18 sound、36/36 scanner fixtures、48 text／6 inventory rules、127 個 submission files／22 個文字檔與 Pages audit 均通過。Draft build 為 initial JS 199833 gzip B、entry 181592 B、CSS 43688 B；submission build 為 initial JS 193737 gzip B、entry 160908 B、CSS 43688 B；lazy 3D closure 638680 raw／169383 gzip B。
- `pnpm run check:publication` 仍如預期 exit 1，共 11 個 blocker：rights review、publication gate、applicant attestation，以及 scene images／music／literary source／Canva 四類來源與 evidence refs 均未完成。正式站資產 HTTP 200 只證明技術上公開可達，不代表權利已核准；這仍是 P0。
- 2026-07-17 Lighthouse 數據保留為歷史 localhost lab 證據。PR #5 已改動 LCP 文字與 source fingerprint，未重跑 Lighthouse 前不得把該 archive 稱為現行 content fingerprint、production field data 或新版文案的效能結論。

## 2026-07-18 文件重打包與線上狀態校正

- 本次先以唯讀方式重查 repository、source、動效、content、workflow、GitHub PR／Actions／Pages 與公開資產，再只更新 Markdown 文件；沒有修改應用程式、內容資料、媒體、workflow 或 runtime 行為。
- 文件更新前 working tree 乾淨。HEAD／`origin/feat/portfolio-admission-foundation` 為 `e1c4b16`；`main`／`origin/main` 為 `ca956c9`。兩者 tree identical，但 squash／merge 後 commit lineage 不同。PR #1–#4 均已 merged，不再存在待更新的 Draft PR #1。
- `ca956c9` 的 Pages run `29643814012` 已成功，Pages API 為 public／`built`，`https://ruyuang0509.github.io/ruyuang-portfolio/` 實測 HTTP 200；Hamlet MP4、英文 VTT 與 poster 亦各自 HTTP 200。
- 上線狀態與權利治理存在 P0 不一致：manifest 仍是 `rightsReview.status: unverified`、`rightsManifestPresent: false`，deploy workflow 只跑 `check:submission`，沒有跑 `check:publication`。部署成功不是 rights clearance；下一步必須由 stakeholder 完成 rights evidence／attestation，或在核准前停止／移除公開 Hamlet 資產。
- 動效已依 `narrative guidance`、`interaction feedback`、`atmosphere / authorship`、`decorative`、`performance risk` 重新盤點於 `docs/website/DESIGN_AND_INTERACTIONS.md`。本次文件打包未移除或改變任何動效。
- Fresh `pnpm run doctor` exit 0：5 件內容、18/18 sound、36/36 scanner fixtures、48 text／6 inventory rules、127 個 submission files／22 個文字檔與 Pages audit 均通過。Submission build 為 initial JS 195067 gzip B、entry 162901 B、CSS 43688 B；lazy 3D closure 638680 raw／169383 gzip B。
- `pnpm run check:publication` 如預期 exit 1，列出 rights status、publication gate、applicant attestation，以及 scene images／music／literary source／Canva 的核對與 evidence refs 未完成。獨立 `dist/` 文字掃描為 0 leak、107 個 public／dist portfolio files 全部 hash 相同；修正 checklist 不再以 `rg -a` 將 MP4 bytes 誤判為文字路徑。

## 2026-07-18 初代動態鑑識復原

- 初代原始碼與錄影只證實 Hero 片語 line-mask stagger 與整個 viewport 的捲動色場轉換；本輪因此只復原 Hero 片語由 `y:112%`、交錯 `±3deg` 進入的節奏。研究介紹首幀維持部分可見，沒有恢復整頁 mount opacity／translate，也沒有新增證據不足的通用 section reveal 或卡片 opacity stagger。
- 現行 fixed viewport field 優於初代 document-root 色彩插值，予以保留；進度依實際 section 幾何維持約 0.8–1.2 viewport 的可停留、可逆範圍。Hero canvas 的永久 `will-change` 已移除。
- `AnimatedDetails` 現在支援 `defaultOpen`、共用 live reduced-motion media query、快速反轉、ResizeObserver 高度 retarget、偏好在動畫中途切換時立即完成，以及完成／unmount 後取消 WAAPI effect。Lenis 也會在 reduced-motion 執行期間變更時即時建立／銷毀。
- 深層 fragment 導覽改為 double-rAF layout settle 與最多兩次 fixed-nav offset 校正；wheel、touch、pointer 或 scroll key 會取消尚未完成的校正，避免先前的長 rAF settle 與使用者輸入競爭。
- 1440×900、2048×767、390×844 rendered matrix 已覆蓋 Hero、轉場 0／25／50／75／100%、正反向與中段停留；轉場 range 分別是 0.914／0.953／0.870 viewport，三組皆 0 horizontal overflow。長逐字稿的 resize-during-open、六次快速反轉、Enter／Space，行動選單 Escape／focus restore 與 fresh console 0 warning／error 均通過。

## 2026-07-17 全畫面捲動漸變與折疊動畫修正

- 只處理兩個指定問題：以 fixed full-viewport field 取代作品索引前的靜態 gradient bridge；以共用 `AnimatedDetails` 與既有 Motion 讓所有實際 disclosure／行動選單具備可逆高度動畫。沒有重設 palette、typography、navigation IA、cards、SEO、responsive system 或其他全站 motion，也沒有新增 dependency。
- 轉場分類為 `narrative guidance` + `atmosphere / authorship`；自然邊界以 `#data-visualization-series` bottom 70% → `#project-index-title` top 25% 計算，再把距離 clamp 為 0.8–1.2 viewport。期間只 scrub 專用 paper／mist／radial layer 的 opacity／transform；Document root、前景 tokens、內容 blur 與 layout 高度不參與。
- Disclosure 分類為 `interaction feedback`：Prompt Template、7 個圖解長描述與中英逐字稿保留 `<details>/<summary>`，實際高度展開 360 ms／收合 300 ms；行動選單沿用 Motion 以相同節奏動畫 height／opacity。Enter、Space、Escape、focus restore、`aria-expanded`、`aria-hidden` 與 `inert` 均保留。
- 移除的 motion／互動：沒有。只移除上一輪非動畫、佔 layout 高度的靜態 bridge，並取代原生瞬間 disclosure toggle；當時的 Hero、R3F、cards、Custom Cursor 與 sound feedback 均未變更。Repository 與初代證據都沒有可確認的通用 section reveal 系統。
- Rendered evidence：1440×900 的 scroll range 約 823 px／0.914 viewport，375×812 約 712 px／0.877 viewport；中段四角與中央同時進入暖灰場域、停止後狀態不漂移、反向捲動可逆、fixed layer 不攔截 pointer，兩種 viewport 均 0 horizontal overflow。375 px 長逐字稿可由約 70 px 展開到 2056 px 再收回；滑鼠、快速反轉、Enter、Space、mobile Escape／focus restore 與 console 0 warning／error 通過。

## 2026-07-17 全站觀看體驗優化

- 本輪採保守式優化：保留既有深墨／暖紙視覺、Hero R3F、GSAP／Lenis、Custom Cursor、卡片與 Web Audio 動效，沒有移除動畫、改寫全域主題、加入 runtime dependency 或變更部署設定。
- Hero 主標改用共用 `EditorialHeading` 的完整語意與受控換行，並收斂行動／桌面字級；320×568、375×812、768×1024、1024×768、1440×900、1920×1080 均可在第一屏看見研究介紹與 CTA，沒有全頁水平溢位。
- Navbar 依目前 hash／可見區段提供 `aria-current="location"` 與明確 active 樣式；桌面、行動與首頁入口的主要點擊目標至少 44 px，行動選單仍保留 Escape 關閉與 trigger 還焦。
- 深層 fragment 導覽會暫時讓目標長案例退出 `content-visibility:auto`，在既有 Lenis range 重算後以有界重試定位；直接載入與從作品索引點擊最後一件案例都落在 fixed nav 下約 96 px。
- 兩件資料視覺化案例的 `titleLines` 已補回完整標題；內容 validator 會把視覺分行攤平後與 `title` 比對，避免窄螢幕只顯示部分標題。
- Reading map 只渲染實際存在的媒體區段連結；移除旗艦聲響案例原本指向不存在 `#interactive-sound-learning-media` 的空連結。Fresh submission preview 共 83 個站內連結，0 broken target、0 duplicate ID、0 broken image、0 console warning／error。

## 2026-07-17 AI 文學故事 MV 觀看體驗續作

- 保留 `generative-interface-study`、共用案例 renderer、深墨／暖紙端點與既有 Hero／R3F／Custom Cursor／卡片／Navbar／Web Audio 動效；本輪沒有移除或改寫全站動畫，也沒有新增全域 RAF、scroll listener 或 runtime dependency。
- AI 案例索引新增 `40 秒 / 8 幕 / EN + zh-TW 字幕 / 影音原型完成，學習成效未驗證` 快覽；header CTA 改為影片、八幕分鏡與 Prompt 設計三個真實同頁 anchor。
- Featured video 使用 `preload="metadata"`，Save-Data 為 true 時降為 `none`；保持 paused、native controls、`playsInline`、16:9 intrinsic size、`object-fit: contain`、English 預設與 `zh-TW` 繁中 subtitle track。影片摘要另揭露 00:40、8 scenes、instrumental／no narration。
- 完整版規格補齊五階段的工具／輸入／產出／控制條件／人工檢查點；媒體層改為故事節點 → 場景圖像 → 英文字幕／情節文字 → 情緒配樂 → Canva 剪輯與最終影片，不再把未存在的旁白列為媒體層。
- 共用圖片 renderer 在載入失敗時保留固定比例、alt 語意與同卡文字；本機影片具 loading／ready／error 狀態，runtime error 仍顯示 Poster、直接 MP4 連結、Storyboard 與逐字稿，subtitle error 會導向同頁雙語逐字稿。
- 「播放案例影片」在同頁 anchor 完成後把焦點交給 native video；初始深層 hash 會只展開 fragment 所屬長案例、重算既有 Lenis scroll range 再定位，修正 `content-visibility` placeholder 把深層目標夾在舊上限的實際問題。
- 八幕 storyboard 現在含中英標題、時間、數值 `seekSeconds`、英文畫面文字、情節、控制條件與每幕「跳至此幕」按鈕；Scene 01／04／08 實際定位到 0／15／35 秒且不自動播放。手機另有上一幕／下一幕與目前幕數，鍵盤支援左右／Home／End。
- 第一輪 browser 回歸發現 smooth rail navigation 在快速 End → Home → ArrowRight 時會讓視覺位置與目前幕數短暫不同步；只將新加入的 storyboard rail 鍵盤／上一下一幕改為立即 snap，保留 Scene → video 的低幅度平滑導引。既有品牌動畫未變更。
- 中英畫面文字逐字稿維持八段，新增每幕畫面描述與配樂情緒（設計意圖），並明示「無歌詞配樂、沒有旁白或對話、不是語音辨識結果」。
- 外部證據檢查：Canva 短網址可在未登入狀態讀到正確 40 秒 Hamlet 專案，但導向可編輯介面；四個 ChatGPT share URL 只能讀到標題，對話內容顯示登入牆。因分享權限、內容可讀性與權利 gate 未完成，兩者都維持不進 submission UI，結果記於 `portfolio.internal.js`。
- Fresh browser matrix：320×568、375×812、768×1024、1024×768、1276×720、1440×900、1920×1080、2560×1080 均為 0 global/case overflow、0 broken image；8 frames、8 seek buttons、2 prev/next controls、2 text tracks 與 3 個有效 CTA 全部存在。375×812 行動選單 Escape 關閉並還焦，Storyboard CTA 落在 fixed nav 下約 120 px；VTT／MP4／AVIF／WebP preview endpoints 均 200 且 MIME 正確。
- Browser 能確認 English track 初始 `showing`、繁中 track `disabled`、影片 paused／duration 40／兩軌、CTA／hash／transcript／seek；目前工具無法穿透 native video shadow controls 可靠操作字幕選單與音量，也無法模擬 Save-Data、system reduced-motion 或真實 browser 200% zoom。這些仍列為人工／實機限制，不以原始碼檢查冒充互動通過。
- Motion-forensics 直接前後 Lighthouse：修正前 archive `2026-07-17T16-21-04-610Z` 為 mobile Performance／Accessibility 94／100、LCP 2634 ms、TBT 75 ms、transfer 459090 B，desktop 100／100、LCP 555 ms、TBT 0 ms、transfer 442761 B。最終原始碼兩次 run 都維持 mobile 94、desktop 100；最新 archive `2026-07-17T17-31-33-225Z` 為 mobile LCP 2651 ms、TBT 90 ms、transfer 460502 B，desktop LCP 560 ms、TBT 0 ms、transfer 444173 B，另一 run 的波動上界為 mobile 2654／98 ms、desktop 602／38 ms。Accessibility／Best Practices／SEO 100、CLS 0；這仍是 localhost lab，不是 production field data。
- 375px 實際 404 模擬：移開 built MP4 後保留 Poster、直接連結、8 幕 Storyboard、8 cue 逐字稿與 0 overflow；移開 Scene 01 六個 responsive files 後卡片仍高 556 px，時間碼與跳轉控制保留。English VTT 的 4180 media cache 未重新觸發 error event，因此 subtitle-error UI 沒有被冒充為已模擬通過；正常兩軌與 transcript fallback 已驗證。

- **Repository：** canonical local workspace 為 `C:\Users\911su\Documents\Codex\如願個人網站`；`origin` 為 `https://github.com/Ruyuang0509/ruyuang-portfolio.git`。
- **Base branch：** `main`，本機與 `origin/main` 於 2026-07-23 均指向 `695b520`。
- **Working branch：** `codex/public-copy-rewrite`，本機 HEAD 與同名遠端分支均為 `61ea9d8`。
- **Last verified commit：** `61ea9d8` 與 `695b520` 的 tree 相同；目前 branch 與 main 的 commit history 各自有 6／1 個獨有 commits，內容差異為 0。這是 PR merge history，不應用一般 ahead／behind 數字誤判為內容落後。
- **Git／PR status：** PR #1–#5 均已 merged；PR #5 於 2026-07-19 合併為 `695b520`。開始 2026-07-23 文件更新前 `git status --porcelain` 為空；本輪只產生 docs 修改，沒有 stage、commit、push、merge、deploy 或 runtime 變更。
- **Current site status：** 已知 hidden asset、built construction wording、scanner 假陰性、metadata drift、hidden completeness 假警告與 Three 超大 lazy chunk 均已在本機 closure。`generative-interface-study` 是 AI 文學故事 MV，含 40 秒影片、雙語字幕、八幕實際畫面、事後衍生且未用於成片的 Prompt Template，以及 planned evaluation；維持 `notValidated`。GitHub Pages 已部署新版第一人稱文案且技術上可達；正式使用者研究、權利簽核、輔具／實機、canonical／custom domain 與 production field evidence 仍未完成。

# Documentation Package Refresh

- 沿用 `docs/website/` 七份模組化文件；沒有新增重複的單一總檔。
- 重新核對 repository、Git、routes、content data、components、styles、Web Audio、public assets、scanner、Pages workflow、既有 `dist/` 與 Lighthouse lineage。
- 修正「沒有 Git repository」、「workflow 尚未 push」、「scrollbar 被隱藏」、「hidden case 僅在 internal data」等失效敘述。
- 明確區分 hidden React data、submission bundle content 與 Vite public asset copying。
- 將 stale metadata、scanner 假陰性、hidden-only media 與 performance evidence freshness 納入 GAP、audit、content matrix 與 pre-submission checklist。
- 2026-07-16 文件包整理本身未修改 runtime；2026-07-17 closure sprint 的實作變更另列於下方。
- 2026-07-18 再次打包修正 Git／PR／Actions／Pages 舊快照、36 個 scanner tests 的文件漂移，補上完整動效保存分類與公開部署／rights gate 的 P0 差距；仍只修改 Markdown。
- 2026-07-23 再次同步 PR #5 公開文案、Git／Pages 現況、fresh build budgets 與 publication gate；將較早 Lighthouse 明確降為歷史證據，仍只修改 Markdown。

# Completed This Round

- 修正 GitHub Pages project-site 路徑：`vite.config.js` 使用可攜式 base，`portfolio.js` 透過 `BASE_URL` 組 public assets，`index.html` 使用 `%BASE_URL%`。
- 新增 `scripts/audit-pages-build.mjs` 並串入 `check:submission`；最初加入 Pages workflow。現行 `.github/workflows/deploy-pages.yml` 會在 push 到 `main` 或手動觸發，且已有成功 production runs。
- 新增公開但低比重的 `#ai-workflow`：`AiWorkflowSection.jsx`、`portfolio.js`、Learning Trail 導引；保存 Prompt v1/v2、changelog 與兩個實際失敗案例於 `docs/ai-workflow/`。
- 強化聲音原型：加入第四個鍵盤 range「濾波亮度」、數值 readout、starting／busy 狀態、3 秒 AudioContext resume timeout、pending context cleanup 與可讀 fallback。
- 強化導覽與 reduced motion：anchor 後聚焦目標標題、行動 Escape focus restore；最終移除整頁 mount opacity／translate，讓主要內容從首幀可讀。
- 修正 320px 繁中 display heading 越界、暖紙主題 accent 對比、fine-pointer custom cursor 啟用條件。
- 新增 `RootErrorBoundary.jsx` 並在 `main.jsx` 包住應用根節點。
- 建立 `docs/PORTFOLIO_AUDIT.md`、`docs/CONTENT_MATRIX.md` 與本 handoff；同步現況、架構、差距及提交檢查文件。
- 續作修正桌面鍵盤 anchor：六個固定導覽連結與 Logo 的 Enter 會把焦點交給目標 heading；桌面滑鼠不強制搬移，行動 focus／Escape 行為保持。
- 將 Web Audio 非 React 邏輯抽成 `src/audio/webAudioEngineCore.js`，新增 cancellable resume、35 ms release／50 ms cleanup、頁面隱藏即時清理、context interruption、重疊 start 與建圖失敗 cleanup。
- 新增 `tests/web-audio-engine.test.mjs`；`test:sound` 從 5 個 mapping tests 擴充至 18 個 mapping＋lifecycle tests，未新增依賴。
- 重建 `scripts/run-lighthouse.mjs` 的證據鏈：固定 submission mode／相對 base、submission／Pages scan、動態 preview port、完整 `dist` 與 build-input（含動態 `.env*`）逐檔 manifest、受測 artifact 重驗與保留、完整 resolved profile／benchmark／OS／CPU 環境指紋、freshness／URL／runtime／metrics 驗證、精確 cleanup-error 白名單與 run-specific temp。
- harness 現在從 build 前到發布完成持有跨程序獨占鎖；只回收 metadata 完整且 PID 明確不存在的 stale lock。每個唯一 archive 先寫齊 raw reports、conditions、CLI transcript、manifests 與完整受測 `dist`，最後原子建立 `archive-complete.json`；沒有 completion marker 的目錄不算成功。canonical reports／history 具 rollback，latest summary 最後 atomic replace 作權威指標。
- 每次 audit 保留 mobile／desktop raw JSON、CLI stdout／stderr 與雜湊、latest summary、最近 20 次 history 與 timestamp archive；latest summary 最後才發布，失敗時保留上一份成功證據。
- 2026-07-17 曾修正 Hero LCP：移除整頁 mount opacity／translate，讓介紹與標題首幀可讀；Three 從約 0.29 秒延後至 mobile 約 1.67 秒後請求。2026-07-18 只在片語內層復原 line-mask transform，介紹仍由部分可見狀態進場，沒有恢復整頁隱藏。延遲完成後仍重新檢查目前幾何位置與頁面可見性，只有 Hero 在 240 px preload window 內才首次下載；首次載入後保持 mounted、離屏只暫停 frame loop。場景 lazy／WebGL 錯誤由 Hero 內局部 boundary 接住，不移除標題、介紹或 CTA。
- 移除 document root 的捲動主題切換；支持作品 gallery 與 Reviewer Path 維持局部 `paper-surface` tokens。本輪再把當時加入的無文字靜態 bridge 替換為 fixed full-viewport 場域；ScrollTrigger 只控制專用背景層與 fixed nav chrome，不修改內容或 root palette。
- 已封存的對照 run（主要文字已靜態、Three 尚未延後）為 mobile Performance 87／LCP 3.463 s；其後同一 artifact、source content fingerprint 與 profile fingerprint 的三次 run 為 Performance 96–97、LCP 2.258–2.407 s、TBT 23–34 ms，LCP node 均是 `#hero-title`。
- 修正 Lighthouse 找到的兩項可及性問題：暖紙研究卡的 contextual text color，以及 sound pad 無角色卻使用 `aria-label`；pad 現為具說明的 `role="img"`，四個 range 仍是鍵盤操作入口。
- 將聲音 `role="status"`／live region 移出 `aria-busy` 控制群組，啟用中的 pending 期間仍可立即向輔具宣告；停止按鈕、Escape、離屏與 cleanup 都能取消 pending start，不會在使用者離開後才延遲啟動。
- 恢復長頁的平台 scrollbar 後，本輪進一步讓它穩定繼承 root 深色 tokens；局部暖紙 section 不再造成整頁 scrollbar 變色。
- 將 `body` 最小寬度改為不超過實際可用寬度，避免 320 px viewport 加上 15 px 平台 scrollbar 後產生水平溢位。
- 當時曾核對有效 Git history、`origin` 與 Draft PR #1，並更新「空 `.git`」敘述；該 PR 後來已合併，目前狀態以本文件 2026-07-18 快照為準。
- 完成 submission boundary closure：hidden case 移至 draft-only data alias 與空 media state，移除 13 個孤立 `ph-after-*`／`mv-soft-*` placeholders 及 generator refs；submission-only middleware 讓舊 media／`dist` URL 明確回 404且有效媒體維持 200，filesystem deny 讓 restricted／internal／hidden／historical paths 回 403。
- Scanner 拆成 injectable core 與 thin CLI，目前共有 48 個 text rules、6 個 inventory rules、fail-closed／redacted diagnostics 及 36 個 Node fixtures；bad output exit 1、clean output exit 0。
- 對齊 `llms.txt`、favicon、social preview、index／JSON-LD、案例 SEO 與可及性 label；PR #5 後完整 title 為 `RU / YUAN — 聲響、互動與學習研究所作品集`，不新增未知 URL、聯絡或社群資料。
- 保留 `generative-interface-study` anchor，將案例重構為「AI 文學故事 MV」：匯入 40 秒／8 幕交付版 MP4、英文／繁中 WebVTT，從實際成片衍生 responsive poster、4:5 索引封面與八幕 storyboard；共用 renderer 新增可選 workflow、提示詞決策、媒體分層、證據分類、價值卡、next steps、CTA、多字幕與完整逐字稿，沒有新增 runtime dependency。
- 補齊案例行動可及性：CTA 明確維持至少 44 px 高；八幕 storyboard 可聚焦，支援左右方向鍵、Home 與 End，並提供螢幕閱讀器操作說明；reduced-motion 下取消平滑捲動。
- 新增 Hamlet evidence manifest／形成性計畫／權利 checklist；`audit:evidence` 驗證 direct-copy hashes、60 份 derivative inventory hashes／dimensions、VTT／逐字稿與 63-file public inventory。`check:publication` 需要 applicant attestation 與每一 rights item 的完成狀態／evidence refs，不能只改頂層 status。
- 以 `LeanR3FCanvas` 取代通用 `<Canvas>` namespace extension，只註冊 8 個 Three constructors；Hero section 接收 pointer events，StrictMode cleanup 可取消，離屏使用 demand frameloop。Vite 3D lazy closure 降為 638232 raw／169223 gzip B，最大單檔 483687 B，並由遞迴 built-import budget audit 防回歸。
- Submission scanner 新增 VTT、Web Manifest 與 source map 文字掃描；本輪加入編輯框架 regression 後共有 36 個 fixtures。
- 將編輯用 `portfolioPriorityRules` 移至 draft-only `portfolio.internal.js`；submission scanner 另對其中兩個已知編輯框架句建立 fail-closed regression，避免它們回流公開 bundle。
- 公開案例以 `themeEvidenceStatus` 把本所連結分為 `demonstrated` 與 `researchDirection`；`instituteEvidenceGroups` 只從正確公開案例的 demonstrated 關係派生。公開對齊摘要因此不列尚無直接作品證據的「沉浸式體驗」與「數位孿生」；案例內頁仍可保留，但必須明標為未來研究方向。
- navbar 移除高成本的固定 backdrop blur，改用較不透明表面；Hero canvas 的永久 `will-change` 也已移除，案例媒體只在 hover／focus-within 時暫時晉升。Reduced motion 將 fixed field 改為離散端點並立即切換 disclosure；Lenis 與 disclosure 會回應執行期間的偏好變更。Print 隱藏場域、展開 disclosure 並強制紙色可列印表面。

# Verification

## Commands and results

- **2026-07-24 11 段 IA 最終本機驗證：** `pnpm run doctor` exit 0；scanner fixtures 57/57、inventory rules 7；draft build 470 modules、submission build 467 modules；fresh `dist/` 132 files／25 text files、`public/` 118 files，public→dist 0 missing／0 hash mismatch。`pnpm run check:publication` exit 1，列出 11 個 Hamlet rights／attestation blockers。互動式 in-app Browser 雖已嘗試，但受本機連線隔離阻擋；shell 端 localhost HTTP 200 不等於 Browser 可連線。四個要求 viewport 與 anchor／focus、Web Audio、Pure Data video、reduced-motion、horizontal overflow、console 均未執行，沒有本輪 browser pass。

- **2026-07-17 全畫面漸變／折疊動畫重驗：** `pnpm run doctor` exit 0；workspace、media、text、CJK、evidence、5 件 content validation、18/18 sound tests、draft/submission builds、36/36 scanner fixtures、48 個 text rules、6 個 inventory rules與 Pages audit 全部通過。Submission 為 463 modules、initial JS 193157 gzip B、entry 157531 B、CSS 43103 B，lazy 3D closure 維持 638232 raw／169223 gzip B。In-app Browser 在 1440×900 與 375×812 驗證 fixed viewport、可停留／可逆 scroll scrub、兩向 details animation、Enter／Space、mobile menu Escape／focus restore、0 horizontal overflow 與 0 console warning／error。`pnpm run audit:lighthouse` exit 0；archive `2026-07-17T10-53-04-160Z`，mobile 94／100、LCP 2632 ms、TBT 56 ms，desktop 100／100、LCP 548 ms、TBT 0 ms，兩者 CLS 0。

- **2026-07-17 全站觀看體驗最終重驗：** `pnpm run doctor` exit 0；workspace、media、text、CJK、evidence、5 件 content validation、18/18 sound tests、draft/submission builds、36/36 scanner fixtures、48 個 text rules、6 個 inventory rules 與 Pages audit 全部通過。Submission build initial JS 191708 gzip B、entry 152360 B、CSS 41283 B；lazy 3D closure 維持 638232 raw／169223 gzip B，沒有新增 runtime dependency 或 Vite oversized warning。Fresh browser matrix 與 83 個站內連結稽核結果記於本文件最上方。

- **2026-07-17 institute alignment／theme boundary 前一輪基線：** 1276×720 submission preview 在同一段邊界往返三次的 Chrome trace，style recalculation 由修改前 614 次／68.56 ms 降至 7 次／1.25 ms；Paint 由 5022 次／487.12 ms 降至 7 次／4.39 ms；`#document` Paint 由 612 次／282.18 ms 降至 7 次／4.39 ms。前後都沒有大於 50 ms 的主執行緒長任務或 console issue。DrawFrame signal 未呈現改善：修改前 p95／max 為 13.97／48.10 ms，修改後為 20.99／48.87 ms，因此該輪只確認全域 repaint closure，不把 headless trace 解讀為 FPS 已提升。當時六個指定 viewport 都是 0 horizontal overflow、0 evidence-card overflow、0 loaded broken image，且仍使用 96–200 px 靜態 bridge；本輪已以 fixed viewport field 取代該基線。五條舊編輯規則均未出現在 submission `body.innerText`，四個 evidence group 與 10 個案例 links 全部可解析。

- **2026-07-17 known-gap optimization 最終重驗：** `pnpm run doctor` exit 0；workspace、media、text、CJK、evidence、5 件 content validation、18/18 sound tests、draft/submission builds、33/33 scanner fixtures、46 個 text rules、6 個 inventory rules與 Pages audit 全部通過。Submission scan 盤點 127 files／22 text files；initial JS 187397 gzip B，lazy 3D closure 638232 raw／169223 gzip B，三個 lazy chunks 均低於 500000 B，無 Vite oversized warning。獨立 `dist` 稽核確認 manifest／public／dist 各 63 個 Hamlet assets、public↔dist hash 差異 0，hidden／restricted／delivery-only／local paths／舊品牌與 dead anchors 全為 0。`check:publication` 預期 exit 1，逐項指出 rights、attestation 與 evidence refs 尚未完成。
- **2026-07-17 Power BI metadata closure 重驗：** Spotify Wrapped 製作日期依申請者更正為 `2026/04/23`；Power BI 實作日期依日期備註與申請者確認為 `2026/06/11–2026/06/12`。`pnpm run content:check`、`pnpm run test:submission-scanner`、`pnpm run build:draft`、`pnpm run check:submission`、`pnpm run doctor` 與 `git diff --check` 全為 exit 0；content 5 件、sound 18/18、scanner 32/32，submission 套用 46 個 text rules／6 個 inventory rules。獨立 `dist/` 盤點為 63 files／19 text files；兩個日期各出現 1 次，4 個公開案例 ID 存在，hidden ID、中文佔位語句、受限／raw data、local paths 與敏感檔名皆為 0。未執行 Lighthouse、deployment 或 Git delivery。
- **2026-07-17 submission closure 最終重驗：** `pnpm run doctor` exit 0；workspace、media、text、CJK、5 件 content validation、18/18 sound tests、draft build、31/31 scanner fixtures、submission build、44 個 text rules、6 個 inventory rules 與 Pages audit 全部通過。獨立 final `dist/` 盤點為 63 files／19 text files；construction、舊品牌、dead anchors、hidden case／assets、restricted／raw data、local paths 與 short YouTube 全為 0。乾淨啟動的 submission dev 對 13 個舊 media URL 與 `/dist/*` 回 404、有效 media 回 200，restricted／internal／hidden／report 回 403；公開 `portfolio.js` 回 200 且不含 hidden ID。未執行 Lighthouse。
- **2026-07-16 修正前文件包重驗：** `pnpm run doctor` exit 0；workspace、media、text、CJK、5 件 content validation、18/18 sound tests、draft build、submission build、當時的 31-term scanner 與 Pages audit 全部通過。`generative-interface-study` 仍只有「媒體證據」非阻斷警告；Three chunk 約 851.22 kB／gzip 225.76 kB，保留 >500 kB warning。
- **2026-07-16 修正前獨立 fresh `dist/` audit：** built bundle 當時仍有兩處「施工模式」；`dist/media/portfolio` 當時仍有 13 個 `ph-after-*`／`mv-soft-*`／MP4 hidden-only 檔；`llms.txt`／favicon 仍是 Nextgen Portfolio，並含 `#graphic`／`#photo`／`#contact`。`immersive-memory-map` ID／標題、`時間待確認`、Power BI restricted 檔名、local path 與敏感副檔名未找到。這是本次 closure 的修正前基線，不代表目前狀態。
- **2026-07-16 修正前文件 QA：** 當時更新文件的相對 links 全部可解析、Markdown fences 成對、`git diff --check` 通過；該輪 tracked diff 只有 Markdown。
- `pnpm install --frozen-lockfile`：exit 0、lockfile 已是最新；本機使用 pnpm 11.9.0。pnpm 自動查詢自身更新時因受限網路出現 registry metadata fetch warning，不影響既有依賴安裝。
- `pnpm run doctor`：exit 0；依序完成下列全部本機門檻。
- `pnpm run workspace:check`：通過，確認 canonical workspace。
- `pnpm run audit:media`：通過，無遠端 demo media 或過時 preconnect。
- `pnpm run audit:text`：通過，未偵測疑似 mojibake。
- `pnpm run audit:cjk`：通過；320px 修正後 rendered heading 無越界。
- `pnpm run content:check`：通過 5 個資料項目；AI 文學故事 MV 的 provenance／workflow／媒體／deliverables／evaluation plan 均通過，submission-hidden completeness 群組正確標為不適用，無 warning。
- `pnpm run test:sound`：18/18 通過；5 個 mapping tests、13 個 Web Audio controller lifecycle tests。
- `pnpm run build:draft`：通過。
- `pnpm run check:submission`：通過；36 個 scanner regression fixtures、48 個 text rules、6 個 inventory rules、22 個 built text files 與 Pages root-relative asset audit 通過。
- `pnpm run build:submission`：2026-07-23 由 `doctor` fresh build 通過；463 modules、entry 160908 B、CSS 43688 B、initial JS 193737 gzip B；lazy `HeroScene` 151720 B、`three-core` 483687 B、`vendor` 3273 B，完整 closure 638680 raw／169383 gzip B，無 oversized warning。
- `pnpm run audit:lighthouse`：最終原始碼連跑兩次皆通過；最新 archive `2026-07-17T17-31-33-225Z` 為 mobile Performance／Accessibility 94／100、LCP 2651 ms、TBT 90 ms、transfer 460502 B，desktop 100／100、LCP 560 ms、TBT 0 ms、transfer 444173 B，兩者 CLS 0。直接修正前 archive `2026-07-17T16-21-04-610Z` 的對應值為 mobile 94／100、2634 ms、75 ms、459090 B，desktop 100／100、555 ms、0 ms、442761 B。Fresh 報告都通過 runtime／fingerprint／manifest 驗證；已具名的 Chrome profile cleanup `EPERM` 只在報告完成後出現並由 harness 驗證保留。這是 localhost simulated lab，不是 production field data。
- 另做真實雙程序互動測試：持鎖 audit exit 0、競爭 audit 快速 exit 1、競爭期間既有 summary SHA-256 不變，完成後無 lock 殘留；此測試結果未另封存成 archive evidence。Lighthouse CLI 在目前 Windows 環境有時會在完成 JSON 後因 Chrome profile cleanup `EPERM` 回傳 1；harness 只有在 fresh report 通過全部驗證，且 stderr 精確符合該 run 專屬 Chrome temp 的已知 `rm`／`Launcher.destroyTmp` 簽章時才降為具名 warning並封存完整輸出。其他非零退出一律失敗。

## Browser viewports

- **2026-07-26 Phase B current smoke：** In-app Browser 以 submission preview 驗證 1280×720、768×1024、375×812、320×568。Confirmed attestation 與修正後作品卡皆可見；待本人確認與舊權利卡片為 0。Suno link 取得 `:focus-visible`；Hamlet 影片為 40 秒、controls true、autoplay false、2 tracks，Space 可播放／暫停；8 幕分鏡保留。四 viewport global horizontal overflow 為 0；case targets 無 broken target、duplicate ID 0；clean tab console logs 0。
- 下列較早 viewport 結果只作歷史補充；screen reader、真實 200% zoom、system reduced-motion、實機觸控與多瀏覽器音訊仍未可靠涵蓋。

- AI 文學故事 MV 最終 submission preview 以 320×812、375×812、768×900、1024×900、1440×900 實測；五組實際 `innerWidth` 與要求一致，global horizontal overflow 皆為 0，案例內 broken image 皆為 0。
- 五組皆渲染 5 個 workflow 階段、4 張 Prompt 決策卡、8 幕 storyboard 與 3 張成果卡；三個 header CTA 目標存在，320 px 最小 CTA 高度實測 44 px。
- 歷史五組皆為 paused、無 `autoplay`、有 controls／`playsinline`；2026/07/17 續作後 featured video 改為一般 `preload="metadata"`／Save-Data `none`，English／`zh-TW` subtitle tracks 均存在，英文預設軌載入為 showing，兩個 VTT endpoint 回 `200 text/vtt`。
- 2026/07/17 續作在 375×812 實際點擊「查看八幕分鏡」後，目標停在 fixed header 下約 120 px；中英畫面文字逐字稿可展開並含 8 cues。320×568 storyboard 的 End／Home／ArrowRight／ArrowLeft 依序同步到 Scene 08／01／02／01；最終 preview console warning／error 為 0。
- 320×568、375×812、768×1024、1024×768、1280×800、1440×900。
- 六組皆為 0 global horizontal overflow、0 broken image；fixed nav 與 sound controls 在 viewport 內。
- 375×812：行動 menu 可開啟、Escape 關閉並還焦；anchor 後焦點進入目標 heading。
- 1440×900：桌面六個 nav links 與 Logo 皆以 Enter 更新正確 hash 並聚焦目標 H1／H2；滑鼠點擊仍保留 link focus。
- 1024×768：聲音無 autoplay；啟用後顯示 busy，AudioContext 未恢復時逾時為可讀 error fallback。
- refactor 後 1024×768 再驗證 `尚未啟用 → 聲音啟用中 → 聲音啟用失敗`，`aria-busy` 回到 false、按鈕可重試，console error 為 0。
- 700px fine pointer 不啟用 custom cursor；800px fine pointer 才啟用。
- 未能可靠模擬真實 200% zoom、系統 reduced-motion、screen reader 與實機觸控，不能視為已通過。

## Screenshots

- `reports/browser/2026-07-16-before-mobile-375x812.png`
- `reports/browser/2026-07-16-after-mobile-375x812.png`
- `reports/browser/2026-07-16-after-desktop-ai-workflow-1440x900.png`
- `reports/browser/2026-07-16-after-sound-fallback-1024x768.png`
- `reports/browser/2026-07-17-ai-mv-before-{index,case,boundary}-{375x812,1440x900}.png`
- `reports/browser/2026-07-17-ai-mv-after-{index,case,storyboard,boundary}-{375x812,1440x900}.png`
- `reports/browser/2026-07-17-ai-mv-full-before-{index,case,video,storyboard,boundary}-{375x812,1440x900}.png`
- `reports/browser/2026-07-17-ai-mv-full-after-{index,case,video,storyboard,boundary}-{375x812,1440x900}.png`
- `reports/browser/2026-07-17-ai-mv-full-pass4-workflow-{375x812,1440x900}.png`
- `reports/browser/2026-07-17-ai-mv-full-after-media-layers-final-1440x900.png`
- `reports/browser/2026-07-17-ai-mv-full-{video,image}-error-fallback-375x812.png`

# Content Still Needed From Applicant

- **作品文字：** 私人研究計畫 DOCX 的公開審閱版與逐項核對、最終申請敘事簽核、各案例真正的測試觀察與限制。
- **圖片：** AI 文學故事 MV 已有八幕成片畫面；仍缺原始場景圖與完整 Prompt log。Power BI 真實結果影像預設不公開，只有另取得資料提供方明確許可後才重新評估。
- **音訊：** 可公開的 Pd 或 REAPER 輸出；旗艦原型若要加入錄製，也需申請者提供或確認。
- **影片：** Hamlet 交付版 MP4、雙語 WebVTT、逐字稿與具名權利聲明的技術關聯已核對；仍需實機／多瀏覽器字幕測試。既有 YouTube captions／transcript 仍待人工核對；如有旗艦操作錄影與字幕可補。
- **Pd patch：** 真實 patch、signal flow、操作說明與反思；目前沒有。
- **REAPER evidence：** 真實 project/session 截圖、軌道／效果鏈與可公開輸出；目前沒有。
- **研究計畫：** 私人 DOCX 已存在，但需完成題目、問題、方法、文獻、設備、樣本、預算、倫理、metadata、南藝大聲響科技研究所官方資料與公開範圍的逐項核對，才可產生公開審閱版或下載。
- **履歷／聯絡：** 公開 Email、GitHub／社群、履歷 PDF 及公開範圍；目前 Reviewer Path 只提供站內 CTA。
- **授權／credit：** Hamlet 已有公開權利／來源清單、Suno limited-use credit 與具名 attestation，但未找到八幕原始生成紀錄、原始 EML 或可編輯 Canva 專案，不得宣稱已完成獨立原始證據查驗；Power BI 真實結果另行公開許可仍未取得，其他外部影片、團隊作品角色、媒體著作權與引用方式仍待核對。

# Decisions And Constraints

- 保留 Vite + React 19、Motion、R3F、Tailwind v4、GSAP／Lenis 與資料驅動案例架構；本輪沒有框架遷移。
- Web Audio 是目前唯一可操作聲響證據；Pure Data／REAPER 必須維持「學習中」，直到真實 artifact 存在。
- 音訊不得 autoplay，只能由明確手勢啟動，且要能 stop、cleanup、unsupported／timeout fallback。
- R3F 保持 lazy／progressive，DOM 首屏文字維持預期 LCP path；Three 在 mobile 延後、且 Hero 仍在 preload window／可見頁面內才請求。目前 lazy 3D closure 為 638680 raw／169383 gzip B，最大單一 chunk 483687 B。2026-07-17 的 mobile Performance 94／LCP 2.651 s 只屬歷史 localhost lab；PR #5 已改動 Hero 文案 fingerprint，仍須對現行內容重跑 Lighthouse 並以低階真機決定是否再簡化。
- 公開文案只在 `portfolio.js`；施工備註只在 `portfolio.internal.js`；submission 隔離不可退回 CSS hiding。
- `restricted-media/` 不得移入 `public/`；不可重加 remote demo media、付費 GSAP plugin、假測試結果或假聯絡連結。
- AI 使用「生成式 AI」或「大型語言模型（LLM）協作」名稱；不得宣稱自研 LLM。作品事實、選件、視覺方向、取捨與驗收由申請者負責。
- GitHub Pages workflow 目前同時接受 push 到 `main` 與 `workflow_dispatch`，並在 configure／upload 前依序執行 submission 與 publication gates。本次交付只 commit、push 與建立 PR，不 deploy、merge 或 force push；既有 production run 仍是較早 fingerprint。
- 新增 dependencies：無。AI 文學故事 MV 使用使用者提供的本機交付資產，僅匯入交付版 MP4、兩條 WebVTT 與從成片衍生的 responsive 圖像；沒有網路下載第三方素材。使用者提供的兩份網站 prompt 仍以 Markdown 原文保存，非 runtime dependency。

# Remaining Work

## P0

- Hamlet limited-use publication gate 已解除；後續若網站加入廣告、付費牆、affiliate revenue、商業廣告用途或音樂發行，必須重新取得授權並讓目前 gate fail closed，不能沿用本次核准。
- 原始八幕生成紀錄、原始 EML 與可編輯 Canva 專案仍未找到；如日後取得，應留在 private evidence workspace，公開端只更新刪節 evidence lifecycle，不提交私人郵件或聊天內容。
- Power BI 原始資料、清洗檔、儀表板實作檔、實際截圖與含真實結果的操作紀錄維持隔離；只有另取得資料提供方明確許可後才重新評估。

## P1

- 完成 Web Audio 與 AI 文學故事 MV 的形成性使用者測試、任務觀察與版本比較；公開結果前保留原始紀錄與同意依據。
- 補一個可公開的 Pure Data 或 REAPER 最小 artifact。
- 以 NVDA／VoiceOver、真實 200% zoom、system reduced-motion、iOS／Android 與多瀏覽器 Web Audio 做人工矩陣。
- 人工核對 YouTube captions／transcript；決定履歷、聯絡資料，以及私人研究計畫 DOCX 的核對、公開審閱版與公開範圍。
- 決定目前 GitHub Pages 是否繼續作為正式入口；補 canonical／custom domain 與 production URL 的人工驗收。PR #1–#5 已合併；後續實作另開新的 `codex/` branch／PR，不重複使用已合併 PR。

## P2

- Fresh build 支持目前 638680 raw／169383 gzip B 的延後 3D closure，且沒有單一 chunk 超過 500000 B；Lighthouse archive 因公開文案 fingerprint 已改變而只作歷史比較。仍需重跑現行 Lighthouse、低階 Android／iOS、Save-Data、耗電／GPU 與目前 Pages URL 的真機／field evidence，才能決定是否進一步簡化。
- 若未來加入正式 browser test runner，補 React controls、Escape、IntersectionObserver 與 live-region 自動測試；AudioContext controller lifecycle 已有 13 個 Node tests。
- 評估加入不含部署權限的 PR-only Windows CI，使 `pnpm run doctor` 在 merge 前執行；目前完整 gate 位於合併後的 deploy workflow。
- 目前 hosting 已是 GitHub Pages；仍需補 canonical URL、1200×630 raster social preview、custom domain／privacy 決策。

## Risks and blockers

- Git repository、remote branch、PR #1–#5、舊成功 Actions run 與 production Pages 均已確認；Hamlet publication gate 已串接並在本機通過。現存主要限制是 current branch 尚未合併／部署、private originals 未找到，以及缺少 production field／人工 accessibility／device 驗收。
- Scanner 已攔截目前已知 text／inventory regressions，但仍以獨立 `dist/` 搜尋避免循環自證；新 leak 類型需要新增 rule 與 fixture。
- 2026-07-17 runtime 對應的 Lighthouse archive 已封存；PR #5 已改動 Hero 文案與 source fingerprint，因此目前只能作歷史比較，不能沿用為新版文案的 current-fingerprint 證據。
- 真實使用者研究、聲音作品與授權資料不在 repository，工程端不能代填。
- In-app Browser 無法可靠模擬 screen reader、真實 zoom、reduced-motion 或實機音訊；這些仍需要人工測試。

# Exact Resume Commands

```powershell
pnpm install --frozen-lockfile
pnpm run dev:submission
pnpm run doctor
pnpm run build:submission
pnpm run preview:submission
```

需要效能證據時才執行：

```powershell
pnpm run audit:lighthouse
```

每輪開始先執行：

```powershell
git rev-parse --show-toplevel
git status --short --branch
git branch -vv
git remote -v
git log --oneline --decorate --graph --all -n 15
```

# Next Codex Starting Instruction

先讀 `AGENTS.md`、`README.md`、`docs/CODEX_HANDOFF.md`、`docs/PORTFOLIO_AUDIT.md`、`docs/CONTENT_MATRIX.md`，確認 `codex/hamlet-rights-attestation` PR、Actions／Pages 與 publication gate，再執行 `pnpm run doctor` 及必須通過的 `pnpm run check:publication`。Hamlet limited-use rights 已由蕭智仁於 2026-07-26 確認；後續不得把它擴張為商業用途、獨立原始證據已驗證，或研究／學習成效成功。保留 Vite／React 架構、draft/submission 邊界、可見平台 scrollbar、無 autoplay 與完整 motion preservation contract；不直接修改或 push `main`、不 force push，也不在未經使用者指示下 merge 或 deploy。
