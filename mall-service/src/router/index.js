const authRouter = require('./auth/index');
const cartRouter = require('./cart/index');

module.exports = (app) => {
  app.use(authRouter.routes()); // 通过new出来的Router对象的routes方法把在里面定义好的路由进行注册
  app.use(cartRouter.routes());
};