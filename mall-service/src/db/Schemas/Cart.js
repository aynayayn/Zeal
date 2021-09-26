const mongoose = require('mongoose');
const { getMeta } = require('../helper');

// 去映射用户这个集合的文档有哪些字段（属性）
// ProductSchema不用注册，仅作为子Schema使用
const ProductSchema = new mongoose.Schema({
  iid: String,
  image: String,
  title: String,
  desc: String,
  price: String,
  count: Number,
  status: Boolean,
});
const CartSchema = new mongoose.Schema({
  accountName: String,
  cartList: [ProductSchema],

  meta: getMeta(),
});

mongoose.model('Cart', CartSchema);