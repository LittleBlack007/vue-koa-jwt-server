const jwt = require('jsonwebtoken');
const {secretKey} = require('../config/config.js');
const BasicAuth = require('basic-auth');

class Auth {
  constructor(level){
    Auth.USER = 2;
    Auth.ADMIN = 10;
    this.level = level;
  }

  get middleware(){
    return async (ctx,next) => {
      const authoration = BasicAuth(ctx.request); // 使用basicAuth 获取http basic校验参数的 token
      // 判断 http headers 携带了 Authoration 参数 并且含有token
      // 因为base64加密传入的参数是accout：password，
      // 我们实际传入的是 `token:` 所以拿到basicAuth 解析的时候,token存在authoration.name中
      if(!authoration && authoration.name === 'null'){ 
        ctx.body = {
          state: 104,
          data:{},
          msg: 'token 不存在，验证失败',
          path: ctx.method +' ' + ctx.url
        }
        return;
      }
      // 存在token 则token进行和发行校验
      try{
        var decode = jwt.verify(authoration.name,secretKey);
      }catch(e){  // 1、token不合法  2、token合法但是过期 e.name === 'tokenExpiredError'
        let errMsg = 'token 不合法，验证失败'
        if(e.name === 'tokenExpiredError'){
          errMsg = 'token 已过期，验证失败'
        }
        ctx.body = {
          state: 104,
          msg: errMsg,
          data:{},
          path: ctx.method + " " + ctx.url
        }
        return;
      }

      // 合法， 即将判断权限值
      console.log(decode.scope)
      console.log(this.level)
      if(decode.scope < this.level){
        ctx.body = {
          state: 104,
          message: '权限不足',
          data: {},
          path: ctx.method + " " + ctx.url
        }
        return;
      }
      await next();  // 通过执行下一个中间件

    }
  }
  static verifyToken(token) {
    try{
      jwt.verify(token,secretKey);
      return true;
    }catch(e){
      return false;
    }
  }
}

module.exports = Auth;