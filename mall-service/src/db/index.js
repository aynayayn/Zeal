const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nickname: String,
  password: String,
  age: Number,
});

const UserModel = mongoose.model('User', UserSchema);

// 连接数据库的函数。里面是具体地连接数据库的逻辑。
const connect = () => {
  // mongoose提供了一个connect方法
  // String uris:当前MongoDB部署的具体的路径，现在是部署在本地的，而部署在本地时默认的连接地址为mongodb://127.0.0.1:27017
  // 所以是'mongodb://127.0.0.1:27017'
  // 前面的mongodb代表用的是mongodb协议
  mongoose.connect('mongodb://127.0.0.1:27017/zealmall', ); // 去连接数据库,连接的数据库为zealmall，如果该数据库还不存在，MongoDB会帮我们创建

  // 想要连接数据库，那就得先去把它打开。提示：进入server的bin目录下，键入./mongod --dbpath 数据库数据存储嘛4路径

  // 当数据库被开启的时候会去调用回调函数
  mongoose.connection.on('open',() => {
    console.log('数据库连接成功');

    const user = new UserModel({
      nickname: '小明',
      password: '123456',
      age: 22,
    });

    user.save();
  });
};

connect(); // 执行上面刚刚定义的函数。现在去node这个js文件就可以输出“数据库连接成功”了