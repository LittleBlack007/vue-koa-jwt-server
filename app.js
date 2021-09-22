const Koa = require('koa');
const userRouter = require('./app/api/user.js');
const tokenRouter = require('./app/api/token.js');
const KoaBodyParser = require('koa-bodyparser');
const contentRouter = require('./app/api/content.js');

const app = new Koa();

// 添加中间件，获取请求body里面的数据
app.use(KoaBodyParser());

// 注册文章相关路由
app.use(contentRouter.routes());
// 注册token相关路由
app.use(tokenRouter.routes());
// 添加中间件，监听路由
app.use(userRouter.routes());

app.listen(4777);