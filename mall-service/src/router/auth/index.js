const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getRequestBody } = require('../../helpers/utils/index');
const jwt = require('jsonwebtoken');

// 根据当时注册的Model的名字取出对应的Model
const User = mongoose.model('User');

const router = new Router({
  prefix: '/auth',
});
router.post('/register', async (ctx) => {
  const { account, password, repeatPsw } = getRequestBody(ctx); //ctx.request.body取到post上来的data（主体数据）
  // 后端也需要对请求中的数据主体进行验证
  if(account === '' || account === null ||
      password === '' || password === null ||
      repeatPsw === '' || repeatPsw === null) {
    ctx.body = {
      code: 0,
      msg: '字段不能为空',
      data: null,
    };
    return ;
  }
  if(password !== repeatPsw) {
    ctx.body = {
      code: 0,
      msg: '字段有误',
      data: null,
    };
    return ;
  }

  // 在数据库某集合中查找是否已存在account是传上来的account的文档
  const one = await User.findOne({
    account
  }).exec();
  // 如果有找到
  if(one) {
    ctx.body = {
      code: 0,
      msg: '已存在该用户',
      data: null,
    };
    return; // 返回
  }

  const user = new User({
    account,
    password,
  });
  const res = await user.save(); // mongoose库提供的方法。res接收了resolve函数中的信息。
  // koa会帮我们进行处理，使最终返回的是一个json字符串对象
  ctx.body = {
    code: 1, // 表示这次请求是成功的
    msg: '注册成功', // 给客户端返回的提示文本可以作展示等用
    data: res, // 给客户端返回一些数据
  };
});

router.post('/login',async (ctx) => {
  const { account, password } = getRequestBody(ctx);
  // 后端也需要对请求中的数据主体进行验证
  if(account === '' || account === null ||
      password === '' || password === null) {
    ctx.body = {
      code: 0,
      msg: '字段不能为空',
      data: null,
    };
    return ;
  }

  // 去找数据库里有没有这个用户
  const one = await User.findOne({
    account,
  }).exec();

  // 不存在用户
  if(!one) {
    ctx.body = {
      code: 0,
      msg: '用户名或密码错误',
      data: null,
    };
    return;
  }

  const { _id } = one;
  // 造一个返回剔除password的对象
  const user = {
    account,
    _id,
  };

  // 账号和密码均吻合
  if(password === one.password) {
    ctx.body = {
      code: 1,
      msg: '登录成功',
      // 用户登入成功需要返回给前端的信息，包括用户相关信息和生成的token
      data: {
        user,
        token: jwt.sign(user, 'zeal'),
      }
    }

    return ;
  }

  // 密码错误，登入失败
  ctx.body = {
    code: 0,
    msg: '用户名或密码错误',
    data: null,
  }
});

module.exports = router;

