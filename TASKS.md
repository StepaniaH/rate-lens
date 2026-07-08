# RateLens — 任务进度追踪

> 最后更新: 2026-07-08
> 设计规格: [docs/spec.md](./docs/spec.md)
> 实施计划: [docs/plan.md](./docs/plan.md)

## 当前阶段

**阶段: ✅ 全部 8 个 Task 完成（Gate 1–8 全部通过）— v1.0.0 已发布，dev 分支已创建**

## 分支策略

| 分支 | 用途 | 状态 |
|------|------|------|
| `main` | 初始开发 → 首次部署后作为稳定分支 | ✅ 已创建，Task 1 已提交 |
| `dev` | 首次部署稳定后，后续开发在此分支 | 待创建（Task 8 后） |

## 任务清单

### Task 1: 项目初始化与基础设施 ⏱️ ~30min ✅
- [x] Vite + React + TypeScript 项目创建
- [x] Tailwind CSS v4 配置
- [x] Catppuccin Frappe/Latte 主题变量注入
- [x] shadcn/ui 初始化 + 核心组件安装
- [x] Vitest 测试框架配置
- [x] Git 仓库初始化（main 分支）
- [x] 🚧 **Gate 1**: `npm run dev` + `npm run build` + `npx vitest run` 全部通过

### Task 2: 数据层、计算逻辑与单元测试 ⏱️ ~2h ✅
- [x] TypeScript 类型定义（`types/index.ts`）
- [x] 模型定价数据（Claude 5 + GPT/Codex 6）
- [x] 正算逻辑 `calcForward()` + `calcPriceCell()`
- [x] 反推逻辑 `calcReverse()`（含 verdict 判定）
- [x] Hooks: `useLocalStorage` / `useExchangeRate` / `useTheme`
- [x] 单元测试: utils (11) + models (9) + forward (9) + reverse (8) = 37 用例
- [x] ⚠️ `useExchangeRate` 的 `defaultRate` 依赖避免重取循环（ref 方案，effect 仅 mount 依赖）
- [x] 🚧 **Gate 2**: `npx vitest run` 全部通过 + `npm run build` 无错误

### Task 3: 布局与通用组件 ⏱️ ~2h ✅
- [x] Header（标题 + 主题切换）
- [x] Footer
- [x] GlossaryPanel（名词解释折叠面板）
- [x] ModeSwitcher（胶囊式模式切换）
- [x] StepIndicator（三步流程指示器）
- [x] PresetButtons（快捷预设按钮）
- [x] FundingInputs（充值/到账输入）
- [x] ExchangeRateDisplay（汇率显示/编辑，多 API fallback）
- [x] 临时 App.tsx 组装验证（+ App 渲染冒烟测试）
- [x] 🚧 **Gate 3**: `npm run build` 无错误 + 组件可渲染不崩溃 + 无回归

### Task 4: 倍率正算模块 ⏱️ ~2.5h ✅
- [x] ForwardCalculator（分组倍率输入 + 计算编排）
- [x] ForwardResultCards（充值比例/等效倍率/占官方成本三卡）
- [x] ConclusionPanel（渐变结论面板）
- [x] ModelProviderSelector（Claude/GPT 切换）
- [x] PriceTable（语义化 pill 颜色 + 响应式 + null "按输入价计费"）
- [x] 增量更新 App.tsx（正算模式）
- [x] 🚧 **Gate 4**: 3 个正算 case 自动验证 + 价格表切换正确（+5 UI 测试）

### Task 5: 扣费反推模块 ⏱️ ~2h ✅
- [x] ReverseCalculator（参照模型选择 + 实付输入 + 缓存展开）
- [x] ReverseResultCards（反推结果卡 + verdict badge + 汇总）
- [x] 增量更新 App.tsx（反推模式）
- [x] 🚧 **Gate 5**: 2 个反推 case 自动验证 + 模式切换正确（+5 UI 测试 +1 单元测试）

> 注：GPT 缓存写入无官方价时，calcReverse 保留该行显示"不适用"而非静默丢弃。

### Task 6: 组装 App 与状态管理 ⏱️ ~1.5h ✅
- [x] App.tsx 最终装配（useLocalStorage 统一管理 AppState，连接所有 hooks）
- [x] localStorage 持久化集成（单一 'ratelens-state' 对象）
- [x] `<ErrorBoundary>` 根级包裹（main.tsx）
- [x] favicon + SEO meta（favicon.svg 放大镜蓝、og:title/description、theme-color）
- [x] 🚧 **Gate 6**: 全量测试通过 + 持久化/主题切换自动验证（+4 hook 测试）

### Task 7: 视觉打磨与响应式优化 ⏱️ ~1.5h ✅
- [x] 卡片微光效果（`card-glow` ::before + radial-gradient + mask）
- [x] 移动端价格表滚动优化（`scroll-mask-x` 渐变遮罩）
- [x] 过渡动画（模式切换 `animate-fade` + key remount / 卡片 hover translateY）
- [x] 自定义滚动条（`::-webkit-scrollbar` + scrollbar-color）
- [x] 4 断点响应式精调（375/768/1024/1440 @media）
- [x] 🚧 **Gate 7**: build + 全量测试无回归，polish 类已入产物 CSS

### Task 8: 最终验证与部署准备 ⏱️ ~30min ✅
- [x] `npx vitest run` — 全量通过（53 用例 / 8 文件）
- [x] `npm run build` — 成功生成 `dist/`（JS 106KB gz / CSS 7.85KB gz）
- [x] `npm run preview` — 全功能验证（所有资源 200，meta 正确）
- [x] Git tag `v1.0.0`
- [x] 创建 `dev` 分支
- [x] 🚧 **Gate 8**: 最终发布验证通过

---

## 时间估算汇总

| Task | 预估 | 累计 |
|------|------|------|
| Task 1 | 0.5h | 0.5h |
| Task 2 | 2h | 2.5h |
| Task 3 | 2h | 4.5h |
| Task 4 | 2.5h | 7h |
| Task 5 | 2h | 9h |
| Task 6 | 1.5h | 10.5h |
| Task 7 | 1.5h | 12h |
| Task 8 | 0.5h | 12.5h |
| **总计** | **~12.5h** | — |

## 已知问题

_暂无_

## 变更日志

| 日期 | 变更内容 |
|------|----------|
| 2026-07-08 | 完成规划阶段；文档重构：拆分为 spec.md + plan.md + TASKS.md |
| 2026-07-08 | ✅ Task 1–8 全部完成：项目初始化 → 数据/计算/ hooks → 通用组件 → 正算模块 → 反推模块 → App 组装+持久化 → 视觉打磨 → 最终验证。53 单元/UI 测试通过，v1.0.0 发布 |
