# 潮光影 - 新视听领域智能体平台战略

一个基于React + TypeScript + Vite构建的前端项目，展示新视听领域智能体平台战略。

## 功能特性

- 现代化React技术栈
- TypeScript类型安全
- 响应式设计
- 多页面幻灯片展示

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 部署

本项目已配置GitHub Actions自动部署到GitHub Pages。每次推送到main分支时，会自动构建并部署。

访问地址：https://[你的用户名].github.io/潮光影---新视听领域智能体平台战略-3/

## 项目结构

```
src/
├── components/          # 组件目录
│   ├── Slide1.tsx      # 幻灯片1
│   ├── Slide2.tsx      # 幻灯片2
│   ├── Slide3.tsx      # 幻灯片3
│   ├── Slide4.tsx      # 幻灯片4
│   ├── Slide5.tsx      # 幻灯片5
│   └── icons/          # 图标组件
├── App.tsx             # 主应用组件
├── index.html          # HTML模板
└── index.tsx           # 应用入口