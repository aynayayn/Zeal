import Vue from 'vue';
import Vuex from 'vuex';
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex);

const state = {
  currentUser: null, // 当前用户
  isLogin: false, // 当前用户是否已经登录
  token: '', // 用户登陆后由服务端签发的token
};
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});

export default store
