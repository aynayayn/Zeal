const mongoose = require('mongoose');
const { getMeta } = require('../helper');

// 去映射用户这个集合的文档有哪些字段（属性）
const UserSchema = new mongoose.Schema({
  account: String,
  password: String,

  meta: getMeta(),
});

mongoose.model('User', UserSchema);