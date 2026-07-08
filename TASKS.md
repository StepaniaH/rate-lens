# RateLens — 任务进度追踪

> 最后更新: 2026-07-08
> 设计规格: [docs/spec.md](./docs/spec.md)
> 实施计划: [docs/plan.md](./docs/plan.md)

## 当前阶段

**阶段: 规划完成，等待执行**

## 分支策略

| 分支 | 用途 | 状态 |
|------|------|------|
| `main` | 初始开发 → 首次部署后作为稳定分支 | 待创建 |
| `dev` | 首次部署稳定后，后续开发在此分支 | 待创建（Task 8 后） |

## 任务清单

### Task 1: 项目初始化与基础设施 ⏱️ ~30min
- [ ] Vite + React + TypeScript 项目创建
- [ ] Tailwind CSS v4 配置
- [ ] Catppuccin Frappe/Latte 主题变量注入
- [ ] shadcn/ui 初始化 + 核心组件安装
- [ ] Vitest 测试框架配置
- [ ] Git 仓库初始化（main 分支）
- [ ] 🚧 **Gate 1**: `npm run dev` + `npm run build` + `npx vitest run` 全部通过

### Task 2: 数据层、计算逻辑与单元测试 ⏱️ ~2h
- [ ] TypeScript 类型定义（`types/index.ts`）
- [ ] 模型定价数据（Claude 5 + GPT/Codex 6）
- [ ] 正算逻辑 `calcForward()` + `calcPriceCell()`
- [ ] 反推逻辑 `calcReverse()`（含 verdict 判定）
- [ ] Hooks: `useLocalStorage` / `useExchangeRate` / `useTheme`
- [ ] 单元测试: utils (13) + models (9) + forward (8) + reverse (8) ≈ 38 用例
- [ ] ⚠️ `useExchangeRate` 的 `defaultRate` 依赖避免重取循环
- [ ] 🚧 **Gate 2**: `npx vitest run` 全部通过 + `npm run build` 无错误

### Task 3: 布局与通用组件 ⏱️ ~2h
- [ ] Header（标题 + 主题切换）
- [ ] Footer
- [ ] GlossaryPanel（名词解释折叠面板）
- [ ] ModeSwitcher（胶囊式模式切换）
- [ ] StepIndicator（三步流程指示器）
- [ ] PresetButtons（快捷预设按钮）
- [ ] FundingInputs（充值/到账输入）
- [ ] ExchangeRateDisplay（汇率显示/编辑，多 API fallback）
- [ ] 临时 App.tsx 组装验证
- [ ] 🚧 **Gate 3**: `npm run build` 无错误 + 组件可渲染不崩溃 + 无回归

### Task 4: 倍率正算模块 ⏱️ ~2.5h
- [ ] ForwardCalculator（分组倍率输入 + 计算编排）
- [ ] ForwardResultCards（充值比例/等效倍率/占官方成本三卡）
- [ ] ConclusionPanel（渐变结论面板）
- [ ] ModelProviderSelector（Claude/GPT 切换）
- [ ] PriceTable（语义化 pill 颜色 + 响应式）
- [ ] 增量更新 App.tsx（正算模式）
- [ ] 🚧 **Gate 4**: 3 个正算 case 手动验证 + 价格表切换正确

### Task 5: 扣费反推模块 ⏱️ ~2h
- [ ] ReverseCalculator（参照模型选择 + 实付输入 + 缓存展开）
- [ ] ReverseResultCards（反推结果卡 + verdict badge + 汇总）
- [ ] 增量更新 App.tsx（反推模式）
- [ ] 🚧 **Gate 5**: 2 个反推 case 手动验证 + 模式切换正确

### Task 6: 组装 App 与状态管理 ⏱️ ~1.5h
- [ ] App.tsx 最终装配（清理临时代码，连接所有 hooks）
- [ ] localStorage 持久化集成
- [ ] `<ErrorBoundary>` 根级包裹
- [ ] favicon + SEO meta
- [ ] 🚧 **Gate 6**: 全量集成验证（7 项手动检查 + 全量测试通过）

### Task 7: 视觉打磨与响应式优化 ⏱️ ~1.5h
- [ ] 卡片微光效果（`::before` + radial-gradient）
- [ ] 移动端价格表滚动优化（渐变遮罩）
- [ ] 过渡动画（模式切换 / 数值变化 / 卡片 hover）
- [ ] 自定义滚动条
- [ ] 4 断点响应式精调（375/768/1024/1440）
- [ ] 🚧 **Gate 7**: 4 断点验证 + 主题切换验证

### Task 8: 最终验证与部署准备 ⏱️ ~30min
- [ ] `npm run build` 成功
- [ ] `npm run preview` 全功能验证
- [ ] Git tag `v1.0.0`
- [ ] 创建 `dev` 分支
- [ ] 🚧 **Gate 8**: 最终发布验证

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
