const Koa = require('koa');
const cors = require('@koa/cors'); // 处理跨域的中间件
const koaBody = require('koa-body'); // 帮助更好地处理请求体

const { connect } = require('./db/index');
const registerRoutersFn = require('./router/index');

const app = new Koa();

connect()
    .then(() => {
      app.use(cors());
      app.use(koaBody()); // 处理请求体信息的插件。因为在registersRouterFn中需要使用它，所以放在其前面进行注册
      registerRoutersFn(app); // 注册多个处理不同模块请求的路由的函数

      // 监听127.0.0.1:3000
      // 回调函数会在服务启动成功【即http请求跑起来】之后进行调用
      // 启动成功之后，你可以去浏览器中输入localhost:3000，按道理来讲是有一个服务在的【显示"not found"】
      app.listen(3000, '127.0.0.1', () => {
        console.log('HTTP服务启动成功');
      });
    });
