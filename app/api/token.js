const Router = require('@koa/router');
const { generateToken } = require('../core/utils.js');
const Auth = require('../middlewares/auth.js');

const tokenRouter = new Router({
  // 设置路由前缀 /token
  prefix: '/token'
})

// 检测账号登录，返回token接口
tokenRouter.post('/',async ctx => {
  const user = ctx.request.body;
  // 核实登录账号信息
  if(verifyUserInfo(user)){
    const token = generateToken(user.id,user.scope);
    ctx.body = {
      state: 100,
      message: '登录成功',
      data:{token},
      path: ctx.method + " " + ctx.url
    }
  }else{
    ctx.body = {
      state: 104,
      message: '账号或密码不正确',
      path: ctx.method + " " + ctx.url
    }
  }
});

// 校验token的合法性
tokenRouter.post('/verify', async ctx => {
  const {token} = ctx.request.body;
  const isValid = Auth.verifyToken(token);
  if(isValid){
    ctx.body = {
      state: 100,
      data: {},
      message: 'token合法',
      path: ctx.method + ' ' + ctx.url
    }
  }else{
    ctx.body = {
      state: 104,
      data: {},
      message: 'token不合法',
      path: ctx.method + ' ' + ctx.url
    }
  }
})

// 验证账号密码
function verifyUserInfo(user){
  if(user.name === 'ppp' && user.pass === '123'){
    user.id = 123;
    user.scope = 3;
    return user;
  }
  return false;
}

module.exports = tokenRouter;