## 基于Vue element UI Koa @koa/router  前端哈默学习

### @koa/router 

基本用法 
 //创建一个路由
const  router = new Router()
// api
router.get(url,ascny ctx => {})
router.post(url,ascny ctx => {})
// 模块化导出

然后将路由作为中间件的方式加入到koa中
koa.use(router.routes());

// 开启服务
koa.listen(port);


# JWT 令牌 基于 jsonwebtoken  Koa @koa/router  js-base64

## 生成token

### jwt.sign({需要保存的内容},secretkey,{options(过期时间)});

### jwt.verify(token,secretkey);  校验token是否合法（不合法、过期-e.name === tokenExpiresError）

## token 加密保存  http basic校验
### hearders:{Authorization: `Basic ${Base64(token+':')}`}
