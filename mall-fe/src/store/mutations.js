import {SET_USER_AND_TOKEN} from "./mutations-types";

export default {
  [SET_USER_AND_TOKEN](state, payload) {
    if(payload) {
      state.currentUser = payload.account; //只保存字符串
      state.token = payload.token;
      state.isLogin = true;
    }
    else {
      // 登出的时候清除session Storage里面的东西
      sessionStorage.setItem('userName', null);
      sessionStorage.setItem('userToken', '');
      state.currentUser = null;
      state.isLogin = false;
      state.token = '';
    }
  },
}
