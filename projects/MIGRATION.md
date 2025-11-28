# 项目迁移规范

将外部论文项目页面迁移到本站时，请遵循以下规范。

## 目录结构

```
projects/{project-name}/
├── index.html
└── assets/
    ├── css/
    │   └── style.css
    └── images/
        └── {project-name}/
            └── *.webp
```

## 迁移步骤

### 1. 创建项目目录
```bash
mkdir -p projects/{name}/assets/css projects/{name}/assets/images/{name}
```

### 2. 下载并转换图片
- 下载所有原始图片
- 使用 `cwebp -q 90` 转换为 WebP 格式
- PDF 文件保持原格式

### 3. 适配 HTML
- 更新字体引用为 Inter：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  ```
- 更新图片路径：`static/images/` → `./assets/images/{name}/`
- 更新 CSS 路径：`static/css/` → `./assets/css/`
- 更新图片扩展名：`.png` → `.webp`

### 4. 适配 CSS
参考 `projects/artemis/assets/css/style.css` 模板，修改：
- 字体：`font-family: 'Inter', system-ui, sans-serif`
- 保留项目原有的主题色（`--primary-color`, `--{name}-color`）
- 统一排版结构（hero, section, table 等）

## CSS 变量模板

```css
:root {
  --primary-color: #xxx;      /* 项目主色 */
  --{name}-color: #xxx;       /* 项目特征色 */
  --text-color: #0f172a;      /* 统一文本色 */
  --text-secondary: #475569;  /* 统一次要文本色 */
  --bg-page: #f8fafc;         /* 统一背景色 */
  --border-light: #e5e7eb;    /* 统一边框色 */
}
```

## 检查清单

- [ ] 图片全部转换为 WebP
- [ ] 字体更换为 Inter
- [ ] 图片路径已更新
- [ ] CSS 引用已更新
- [ ] 本地测试通过
- [ ] 在根目录 index.html 添加项目卡片
