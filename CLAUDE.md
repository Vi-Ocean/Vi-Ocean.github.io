# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vi-Ocean.github.io 是 ViOcean Research 的 GitHub Pages 静态网站，用于展示学术研究项目。包含一个汇总主页和多个独立的论文项目页面：

1. **MathGlance** - 评估多模态大语言模型在数学图表理解中的感知能力的基准测试
2. **Artemis** - 用于感知策略学习的结构化视觉推理框架
3. **ViLoMem** - 具有增长和优化多模态语义记忆的智能体学习器
4. **SymVAE** - 层次化过程奖励模型作为符号视觉学习器

## Architecture

```
/
├── index.html              # 汇总主页 (论文列表)
├── shared/
│   └── css/main.css        # 主页共享样式
└── projects/
    ├── mathglance/
    │   ├── index.html      # MathGlance 项目页面
    │   └── assets/         # 项目专用资源 (css, js, images)
    ├── artemis/
    │   ├── index.html      # Artemis 项目页面
    │   └── assets/
    ├── vilomem/
    │   ├── index.html      # ViLoMem 项目页面
    │   └── assets/
    ├── symvae/
    │   ├── index.html      # SymVAE 项目页面
    │   └── assets/
    └── MIGRATION.md        # 项目迁移规范
```

## URL Structure

部署后的 URL 格式：
- 主页: `https://vi-ocean.github.io/`
- 项目: `https://vi-ocean.github.io/projects/{project-name}/`

## Development

纯静态网站，无需构建。本地开发：

```bash
python -m http.server 8000
```

然后访问 `http://localhost:8000`

## Adding New Projects

1. 在 `projects/` 下创建新目录（使用小写论文缩写命名）
2. 复制现有项目结构：`index.html` + `assets/`
3. 在根目录 `index.html` 中添加论文卡片链接
4. 图片使用 WebP 格式 (q=90) 以减小体积

## Key Technologies

- **Inter 字体** - 主页使用
- **Bulma CSS** - 项目页面响应式框架
- **Font Awesome** - 图标库
- **WebP** - 图片格式 (比 PNG 小 50-80%)

## Conventions

- 所有中文回复
- 项目页面模板来自 [Nerfies](https://nerfies.github.io/)
- 主页设计参考 [Cambrian](https://cambrian-mllm.github.io/)
- 图片使用 WebP 格式，PDF 保持原格式

## Design Guidelines (设计规范)

### 统一元素 (所有项目必须遵循)

| 元素 | 规范 |
|------|------|
| **字体** | Inter (400/500/600/700/800) |
| **文本色** | `--text-color: #0f172a` |
| **次要文本色** | `--text-secondary: #475569` |
| **背景色** | `--bg-page: #f8fafc` |
| **边框色** | `--border-light: #e5e7eb` |
| **标题层级** | h1: 2.25rem, h2: 1.85rem, h3: 1.15rem |
| **正文行高** | 1.8 |
| **按钮样式** | 圆角 32px, 2px 边框 |
| **容器最大宽度** | 1040px |

### 项目特色元素 (各项目可自定义)

| 项目 | 主色 | 特征色 | 高亮背景 |
|------|------|--------|----------|
| MathGlance | `#6b21a8` (紫) | `#db2777` (粉) | `#fdf4ff` |
| Artemis | `#0d47a1` (蓝) | `#00acc1` (青) | `#e0f7fa` |
| SymVAE | `#2e7d32` (绿) | `#1565c0` (蓝) | `#e8f5e9` |

### 迁移新项目

详见 `projects/MIGRATION.md`
