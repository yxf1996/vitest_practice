# Vitest Browser Mode vs Playwright E2E 对比测试

这是一个完整的对比测试项目，用于分析 Vitest Browser Mode 和 Playwright E2E 两种测试方案的差异。

## 📦 安装依赖

```bash
# 安装所有依赖
npm install

# 安装 Playwright 浏览器（必需）
npx playwright install chromium

# 或者安装所有浏览器
npx playwright install
```

## 🧪 运行测试

### 1. 运行 Vitest 单元测试

```bash
# 监听模式
npm test

# 单次运行
npm run test:run
```

### 2. 运行 Vitest Browser Mode 测试

```bash
npm run test:browser
```

### 3. 运行 Playwright E2E 测试

```bash
# 需要先启动开发服务器
npm run dev

# 然后在另一个终端运行
npm run test:e2e
```

### 4. 运行所有测试

```bash
npm run test:all
```

## 📊 项目结构

```
vitest-demo/
├── src/
│   ├── components/          # Vue 组件
│   │   ├── Counter.vue      # 计数器组件
│   │   └── TodoList.vue     # 待办事项组件
│   ├── pages/               # 页面组件
│   │   ├── Login.vue        # 登录页面
│   │   └── Dashboard.vue    # 仪表板页面
│   ├── utils/               # 工具函数
│   │   └── math.ts          # 数学工具
│   └── main.ts              # 应用入口
├── tests/
│   ├── unit/                # Vitest 单元测试
│   │   └── math.test.ts
│   ├── browser/             # Vitest Browser Mode 测试
│   │   ├── Counter.browser.test.ts
│   │   └── TodoList.browser.test.ts
│   └── e2e/                 # Playwright E2E 测试
│       ├── login.spec.ts
│       ├── dashboard.spec.ts
│       └── performance.spec.ts
├── vitest.config.ts         # Vitest 配置
├── vitest.browser.config.ts # Vitest Browser Mode 配置
├── playwright.config.ts     # Playwright 配置
└── package.json
```

## 📈 性能分析

运行性能测试并生成报告：

```bash
npm run test:perf
```

## 🔍 测试对比

### Vitest Browser Mode 优势

- ✅ 快速执行（无需启动完整应用）
- ✅ 真实浏览器环境
- ✅ 与 Vitest 单元测试无缝集成
- ✅ 适合组件级测试

### Playwright E2E 优势

- ✅ 完整的用户流程测试
- ✅ 跨页面/跨路由测试
- ✅ 网络请求拦截和模拟
- ✅ 多浏览器支持
- ✅ 适合端到端场景测试

## 📝 注意事项

1. **Vite 版本要求**：Vitest 4.x 需要 Vite >= 6.0.0，Vite 8 是可选的
2. **Node.js 版本**：需要 Node.js >= 20.0.0
3. **浏览器安装**：Playwright 需要单独安装浏览器二进制文件

## 📚 参考资料

- [Vitest 官方文档](https://vitest.dev)
- [Playwright 官方文档](https://playwright.dev)
- [技术方案文档](./技术方案.md)
