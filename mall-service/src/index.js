const Koa = require('koa');

const app = new Koa();

// 注册中间件来处理请求。可以理解为一个回调函数，每次有一个http请求进来的时候，就会触发中间件里边的这个回调函数
// 每个http请求都会有一些信息带上来，比如，url是什么，请求的方法是什么，这些信息都会通过ctx携带，ctx表示请求的上下文，


// 监听127.0.0.1:3000
// 回调函数会在服务启动成功【即http请求跑起来】之后进行调用
// 启动成功之后，你可以去浏览器中输入localhost:3000，按道理来讲是有一个服务在的【显示"not found"】
app.listen(3000, '127.0.0.1', () => {
  console.log('HTTP服务启动成功');
});

console.log('1234');