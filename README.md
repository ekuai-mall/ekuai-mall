# ekuai-mall

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 功能实现
- Auth：登陆注册
- Account：用户中心
    - 改密、个人信息（可追加）、微信绑定（与支付无关）、登出
    - API同Auth类（因router使用一个新的根目录）
- Item：商品信息查询、搜索
    - 商品详情页
    - 商品内容（小）
- Order：商品下单
- Pay：支付
    - 微信支付（Native+JsApi）
