// 用户路由
const Router = require('@koa/router');

const router = new Router();

// 视图函数
router.get('/user', async ctx => {
  ctx.body = "success";
})

router.post('/user', async ctx =>{
  const body = ctx.request.body;
  const user = {
    id: Math.random(),
    name: body.name,
    password: body.pass,
  }; 
  console.log(user);
  ctx.body = {
    data:{
      ...user
    },
    state: 100,
    message: user.name + '创建成功',
    path: `${ctx.method} ${ctx.url}`
  }
})

module.exports = router;