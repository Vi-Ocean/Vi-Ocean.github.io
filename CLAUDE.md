# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vi-Ocean.github.io 是 ViOcean Research 的 GitHub Pages 静态网站，用于展示学术研究项目。包含一个汇总主页和多个独立的论文项目页面：

1. **MathGlance** - 评估多模态大语言模型在数学图表理解中的感知能力的基准测试
2. **Artemis** - 用于感知策略学习的结构化视觉推理框架
3. **ViLoMem** - 具有增长和优化多模态语义记忆的智能体学习器

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
    └── vilomem/
        ├── index.html      # ViLoMem 项目页面
        └── assets/
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
