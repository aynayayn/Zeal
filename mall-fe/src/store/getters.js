export default {
  // cartLength不能实现计算属性个数
  cartLength(state) {
    return Object.keys(state.cartList).length
  },

  cartList(state) {
    return state.cartList;
  }
}
