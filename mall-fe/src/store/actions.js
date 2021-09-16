import {ADD_TO_CART} from "./mutations-types";
import {ADD_COUNT} from "./mutations-types";

export default {
  changeCartList(context, payload) {
    return new Promise((resolve, reject) => {
      if(payload.iid in context.state.cartList) {
        context.commit(ADD_COUNT, payload);
        resolve('当前商品已存在购物车，数量+' + payload.count);
      }
      else{
        context.commit(ADD_TO_CART, payload);
        resolve('添加了新的商品');
      }
    })
  }
}
