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
├── presentation_ppt/       # 演示文稿 (reveal.js 风格)
│   ├── index.html          # 演示主文件
│   └── assets/
│       ├── css/style.css   # 演示样式
│       ├── js/script.js    # 幻灯片控制逻辑
│       └── images/         # 按项目分类的图片
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
- 演示: `https://vi-ocean.github.io/presentation_ppt/`

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

## Presentation PPT (演示文稿)

### 技术规格

| 规格 | 值 |
|------|------|
| 设计尺寸 | 1920 × 1080 (16:9) |
| 缩放方式 | JavaScript viewport scaling |
| 框架依赖 | Tailwind CSS (CDN)、Font Awesome |
| 字体 | Inter (正文)、Playfair Display (标题) |

### 文件结构

```
presentation_ppt/
├── index.html              # 所有幻灯片都在此文件中
└── assets/
    ├── css/style.css       # 布局、动画、固定尺寸样式
    ├── js/script.js        # 缩放、导航、键盘/触摸控制
    └── images/
        ├── logo.png        # 左上角 logo (48px)
        ├── title2.png      # logo 旁文字 (28px)
        ├── artemis/        # Artemis 项目图片
        ├── MATHEMETRIC/    # MATHEMETRIC 项目图片
        ├── SymVAE/         # SymVAE 项目图片
        └── vilomem/        # ViLoMem 项目图片
```

### 幻灯片结构

每张幻灯片使用 `<section>` 标签，必须包含：

```html
<section class="slide flex items-center px-20" data-index="N">
    <!-- 幻灯片内容 -->
</section>
```

- `data-index`: 从 0 开始的幻灯片索引（必须连续）
- 第一张幻灯片需添加 `active` class

### 新增/修改幻灯片要点

1. **添加新幻灯片**
   - 在 `.slide-wrapper` 内添加新的 `<section class="slide" data-index="N">`
   - `data-index` 必须是连续的数字，新增时更新后续所有幻灯片的索引

2. **更新页码显示**
   - Footer 中的总页数 `<span id="total-pages">` 由 JS 自动计算，无需手动修改

3. **更新导航点提示**
   - 修改 `script.js` 中的 `tooltips` 对象来更新导航点悬停提示：
   ```javascript
   const tooltips = {
       0: 'Cover',
       1: 'Agenda',
       2: 'Artemis',
       // ... 添加新的索引和标题
   };
   ```

4. **添加项目图片**
   - 图片放入 `assets/images/{项目名}/` 目录
   - 优先使用 WebP 格式

### 常用幻灯片模板

**双栏布局（左文右图）**
```html
<section class="slide flex items-center px-20" data-index="N">
    <div class="grid grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
        <div class="space-y-8"><!-- 文字内容 --></div>
        <div class="relative group"><!-- 图片 --></div>
    </div>
</section>
```

**全宽内容布局**
```html
<section class="slide flex items-center px-20" data-index="N">
    <div class="flex flex-col h-full justify-center max-w-7xl mx-auto w-full">
        <div class="mb-12 text-center"><!-- 标题 --></div>
        <div class="bg-slate-800/30 p-8 rounded-3xl"><!-- 主要内容 --></div>
    </div>
</section>
```

### 导航控制

- **键盘**: 方向键、空格、Enter、PageUp/Down、Home/End
- **鼠标**: 滚轮、点击右侧导航点
- **触摸**: 上下/左右滑动
- **全屏**: 按 `F` 键
