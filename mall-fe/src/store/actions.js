import {SET_USER_AND_TOKEN} from "./mutations-types";

export default {
  setUserStatus(context, payload) {
    return new Promise((resolve, reject) => {
      if(payload !== null) {
        context.commit(SET_USER_AND_TOKEN, payload);
        resolve('用户登录信息保存成功');
      }
      else {
        resolve('用户可能已登出，未找到登录信息');
      }
    });
  },
}
