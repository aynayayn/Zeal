const mongoose = require('mongoose');
require('./Schemas/User');
require('./Schemas/Cart');

// 连接数据库的函数。里面是具体地连接数据库的逻辑。
const connect = () => {
  return new Promise((resolve) => {
    mongoose.connect('mongodb://127.0.0.1:27017/zealmall', ); // 去连接数据库,连接的数据库为zealmall，如果该数据库还不存在，MongoDB会帮我们创建

    mongoose.connection.on('open',() => {
      console.log('数据库连接成功');
      resolve();
    });
  })
};

module.exports = {
  connect,
};