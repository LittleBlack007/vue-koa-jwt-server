const Router = require('@koa/router');
const Auth = require('../middlewares/auth.js');


const contentRouter = new Router({
  prefix: '/content'
})

contentRouter.get('/list',async ctx => {
  ctx.body = {
    state: 100,
    path: ctx.method + ' ' + ctx.url,
    data:[
      {
        rowId: 123,
        title: 'ppp',
        content: '777777'
      }
    ]
  }
})

contentRouter.post('/create',new Auth(5).middleware,async ctx => {
  ctx.body = {
    state: 100,
    data: {},
    message: '创建成功',
    path: `${ctx.method} ${ctx.url}`
  }
})

module.exports = contentRouter;