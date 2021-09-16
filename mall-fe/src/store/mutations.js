import {ADD_TO_CART} from "./mutations-types";
import {ADD_COUNT} from "./mutations-types";
import {CHANGE_CHECK} from "./mutations-types";
import {CHANGE_CHECK_OF_ALL} from "./mutations-types";

export default {
  /*incrementImgLoadedCount(state) {
    state.imgLoadedCount++;
  },
  setScrollHeight(state, position) {
    state.scrollHeight = position
    //console.log(state.scrollHeight);
  },*/

  [ADD_TO_CART](state, payload) {
    state.cartList[payload.iid] = payload;
    // 把购物车中的商品设置为选中状态
    state.cartList[payload.iid].checked = true;
    state.cartList = JSON.parse(JSON.stringify(state.cartList));
  },
  [ADD_COUNT](state, payload) {
    state.cartList[payload.iid].count += payload.count;
    state.cartList = JSON.parse(JSON.stringify(state.cartList));
  },
  [CHANGE_CHECK](state, iid) {
    state.cartList[iid].checked = !state.cartList[iid].checked;
    state.cartList = JSON.parse(JSON.stringify(state.cartList));
  },
  [CHANGE_CHECK_OF_ALL](state, bool) {
    if(Object.keys(state.cartList).length !== 0) {
      for(let key in state.cartList) {
        state.cartList[key].checked = bool;
      }
      state.cartList = JSON.parse(JSON.stringify(state.cartList));
    }
  }
}
