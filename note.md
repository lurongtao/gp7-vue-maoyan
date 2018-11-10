# maoyan项目

## 2018-11-03
### vue-cli 3
#### vue.config.js
- resolve.alias
- proxy

### UI
#### stylus
#### variables.styl
#### border.styl
#### ellipsis.styl
#### reset.styl
- @import '~alias'

### mint-ui 组件库
#### 配置babel: babel.config.js
#### Indicator

### Vue.js
#### 组件拆分
- App.vue / Home.vue / Movies / MovieList / MovieItem / MovieButton 
- 父传子数据流向
#### 过滤器
- 全局：replaceWH
- 局部：preShowText
#### slot
- 按钮名字
#### 计算属性
- movies
#### 声明周期函数
- mounted
- updated
- beforeCreate

### Axios
- 封装了一个http模块

### lodash
- _.chunk

### svg
- 样式：fill
- iconfont导出svg


# history 路由前后端配置
## 带二级目录的Apache配置
- step1: 修改 vue.config.js
添加配置 baseUrl: '/dist/',

- step2: 修改 router/index.js
const router = new VueRouter({
  mode: 'history',
  base: '/dist/',
  routes
})

- step3: 修改apache 配置
添加：
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /dist/index.html [L]
</IfModule>
- step4: apache 反向代理配置

## 带二级目录的Nginx配置
- step1: 修改 vue.config.js
添加配置 baseUrl: '/dist/',

- step2: 修改 router/index.js
const router = new VueRouter({
  mode: 'history',
  base: '/dist/',
  routes
})

- step3: 配置nginx
在本地目录下，创建conf.d文件夹，里面随意创建任意文件
添加如下配置：
server {
  listen 80;
  server_name localhost;
  root /Users/Felix/Desktop/workspace/gp7/Vue.js/prd-maoyan;
  autoindex on;
  expires 1s;
  charset utf-8;

  location /ajax {
    proxy_pass http://m.maoyan.com;
  }

  location / {
    try_files $uri $uri/dist /dist/index.html;
  }
}
