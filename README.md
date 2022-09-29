# 基于 Vite3.x + Vue3.x + pinia + TypeScript + tailwindcss + element-plus 的单页系统模板

| 标识         | 说明              |
| ------------ | ----------------- |
| sm (640px)   | max-width: 640px  |
| md (768px)   | max-width: 768px  |
| lg (1024px)  | max-width: 1024px |
| xl (1280px)  | max-width: 1280px |
| 2xl (1536px) | max-width: 1536px |

## 特性

- ⚡ [Vue 3](https://github.com/vuejs/core), [Vite 2](https://github.com/vitejs/vite), [pnpm](https://pnpm.js.org/) - 为速度而生
- 💪 [Typescript](https://www.typescriptlang.org/) - 强大的类型检查
- 🔥 使用 [新的 `<script setup>` 语法](https://github.com/vuejs/rfcs/pull/227)
- 💡 [Vue Router v4](https://router.vuejs.org/zh/) - Vue 路由系统
- 🎨 [Tailwind CSS v3](https://tailwindcss.com/docs/configuration) - 快速建立现代网站，而不必离开 HTML。
- 🎉 [NProgress](https://github.com/rstacruz/nprogress) - 页面加载进度反馈
- 🍍 [使用 Pinia 的状态管理](https://pinia.esm.dev/)

### 集成 Tailwind 插件:

- [tailwindcss/forms](https://github.com/tailwindlabs/tailwindcss-forms)
- [tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)
- [tailwindcss/line-clamp](https://github.com/tailwindlabs/tailwindcss-line-clamp)
- [tailwindcss/aspect-ratio](https://github.com/tailwindlabs/tailwindcss-aspect-ratio)

### 推荐的 IDE 设置

- [VSCode](https://code.visualstudio.com/)
- [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## 项目结构

```
# vite
├── README.md
├── auto-imports.d.ts
├── commitlint.config.js     # commit lint
├── index.html
├── node_modules
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js        # postcss  相关配置
├── build                    # Build related scripts
├── mock                     # mock APIs
├── public
│   └── favicon.ico
├── src
│   ├── App.vue              # 入口页面
│   ├── api                  # api 接口
│   ├── assets               # 静态资源
│   │   └── logo.png
│   ├── components           # 全局组件
│   │   ├── Footer           # 页脚组件
│   │   └── Navbar           # 顶部导航栏组件
│   ├── env.d.ts
│   ├── main.ts              # 入口文件
│   ├── router               # Vue router
│   │   └── index.ts
│   ├── store                # Pinia 状态管理
│   │   └── index.ts
│   ├── styles               # 全局样式
│   │   ├── main.scss
│   │   ├── nprogress.scss   # nprogress 样式（顶部加载样式）
│   │   ├── tailwind.css     # tailwind 样式
│   │   └── variables.scss   # SCSS全局变量
│   ├── utils                # 项目公共方法
│   └── views                # 所有页面
│
├── stylelint.config.js
├── types
├── tailwind.config.js       # tailwind 配置文件
├── tsconfig.json            # TS 编译配置
├── tsconfig.node.json
└── vite.config.ts           # Vite 配置文件

```

## 使用

### 开发

只需要执行以下命令就可以在 http://localhost:5500 中看到

```bash
pnpm i
pnpm run dev
```

指定端口

```bash
pnpm run dev -- --port 5500

//或者

npx vite --port=4000
```

### 构建

构建该应用只需要执行以下命令

```bash
pnpm run build
```

然后你会看到用于发布的 `dist` 文件夹被生成。

### nginx 伪静态

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### nginx 配置二级目录

```nginx
    location /jbdn/
    {
        alias     "/www/wwwroot/test.idxiu.cn/jbdn/";
        try_files $uri $uri/ @router;
        index     index.html;
    }

    location @router{
      rewrite ^.*$ /jbdn/index.html last;
    }
```

### nginx 反向代理

```nginx
#PROXY-START/jeecg-boot

location /jeecg-boot
{
    proxy_pass https://xxx.com/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header REMOTE-HOST $remote_addr;

    add_header X-Cache $upstream_cache_status;

    #Set Nginx Cache


    set $static_fileHDiSrPjw 0;
    if ( $uri ~* "\.(gif|png|jpg|css|js|woff|woff2)$" )
    {
    	set $static_fileHDiSrPjw 1;
    	expires 12h;
        }
    if ( $static_fileHDiSrPjw = 0 )
    {
    add_header Cache-Control no-cache;
    }
}

#PROXY-END/jeecg-boot
```
