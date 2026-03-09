# Moonable 部署指南

> 技术栈：Astro 5 (静态输出) + Vue 3 + Tailwind CSS 4
> 包管理器：pnpm
> 站点域名：moonable.ca

## 前置要求

- Node.js >= 18.17.1
- pnpm >= 8

## 构建

```bash
pnpm install
pnpm build
```

构建产物输出到 `dist/` 目录，为纯静态 HTML/CSS/JS 文件，可部署到任意静态托管服务。

---

## 方案一：Cloudflare Pages（推荐）

适合面向加拿大用户的站点，边缘节点覆盖广，免费额度充足。

### 1. 通过 Git 集成部署

1. 将仓库推送到 GitHub / GitLab
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → Workers & Pages → Create application → Pages
3. 连接 Git 仓库，配置构建：
   - **Build command**: `pnpm build`
   - **Build output directory**: `dist`
   - **Environment variable**: `NODE_VERSION` = `20`
4. 点击 Save and Deploy
5. 在 Custom domains 中绑定 `moonable.ca`

### 2. 通过 CLI 直接部署

```bash
# 安装 Wrangler CLI
pnpm add -g wrangler

# 登录
wrangler login

# 部署（首次会创建项目）
wrangler pages deploy dist --project-name moonable
```

### 自定义域名

在 Cloudflare Pages 项目设置 → Custom domains 中添加 `moonable.ca`，按提示配置 DNS 记录。

---

## 方案二：Vercel

### 1. 通过 Git 集成

1. 登录 [Vercel](https://vercel.com)，导入 Git 仓库
2. Framework Preset 选择 **Astro**（自动识别）
3. 确认构建命令为 `pnpm build`，输出目录为 `dist`
4. 点击 Deploy

### 2. 通过 CLI

```bash
# 安装
pnpm add -g vercel

# 部署
vercel --prod
```

### 自定义域名

在项目 Settings → Domains 中添加 `moonable.ca`，按提示在域名注册商处添加 CNAME 或 A 记录。

---

## 方案三：Netlify

### 1. 通过 Git 集成

1. 登录 [Netlify](https://app.netlify.com)，从 Git 导入
2. 配置：
   - **Build command**: `pnpm build`
   - **Publish directory**: `dist`
3. 点击 Deploy site

### 2. 通过 CLI

```bash
pnpm add -g netlify-cli

netlify login
netlify init     # 首次关联
netlify deploy --prod --dir=dist
```

---

## 方案四：自托管（VPS + Nginx）

适合需要完全控制的场景。

### 1. 服务器准备

```bash
# 安装 Node.js（以 Ubuntu 为例）
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx

# 安装 pnpm
corepack enable && corepack prepare pnpm@latest --activate
```

### 2. 构建与部署

```bash
# 克隆并构建
git clone <your-repo-url> /var/www/moonable
cd /var/www/moonable
pnpm install --frozen-lockfile
pnpm build

# 产物在 dist/ 目录
```

### 3. Nginx 配置

```nginx
server {
    listen 80;
    server_name moonable.ca www.moonable.ca;
    root /var/www/moonable/dist;
    index index.html;

    # Astro 静态路由：/contact -> /contact/index.html
    location / {
        try_files $uri $uri/index.html $uri.html =404;
    }

    # 静态资源长缓存（Astro 的 _astro/ 目录带 hash）
    location /_astro/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml image/svg+xml;
    gzip_min_length 1024;

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
}
```

### 4. 启用 HTTPS（Let's Encrypt）

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d moonable.ca -d www.moonable.ca
```

### 5. 自动化部署（可选）

在服务器创建部署脚本 `/var/www/moonable/deploy.sh`：

```bash
#!/bin/bash
set -e
cd /var/www/moonable
git pull origin main
pnpm install --frozen-lockfile
pnpm build
echo "Deployed at $(date)"
```

通过 GitHub Webhook 或 cron 触发即可。

---

## DNS 配置参考

无论选择哪种方案，都需要在域名注册商处配置 DNS：

| 类型 | 名称 | 值 | 说明 |
|------|------|-----|------|
| A / CNAME | `@` | 由托管平台提供 | 主域名 |
| CNAME | `www` | `moonable.ca` | www 跳转 |

---

## 构建产物说明

```
dist/
├── _astro/           # CSS/JS（文件名含 hash，可长缓存）
├── contact/          # /contact 页面
├── kayak/            # /kayak 页面
├── railing/          # /railing 页面
├── index.html        # 首页
├── favicon.svg
├── kayak-camo.webp   # 首页产品图（WebP，~105KB）
├── robots.txt
├── sitemap-0.xml
└── sitemap-index.xml
```

## 注意事项

- `sitemap-index.xml` 和 `robots.txt` 由 Astro 自动生成，指向 `https://moonable.ca`
- 确保部署后 `https://moonable.ca/sitemap-index.xml` 可访问，以便搜索引擎索引
