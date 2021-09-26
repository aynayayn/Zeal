<template>
  <div id="auth">
    <auth-panel ref="authPanel"
                @postInfoForReg="postInfoForReg"
                @postInfoForLogin="postLoginInfo"></auth-panel>
  </div>
</template>

<script>
  import AuthPanel from "./authPanel/AuthPanel";
  import { postRegisterInfo, postLoginInfo } from "network/auth";
  import {mapActions} from 'vuex';

  export default {
    name: "Auth",
    components: {
      AuthPanel,
    },
    // 点击退出登录按钮后，会在进入到/auth路由对应的界面。这时要把session.Storage清掉，并在进入这个路由时把$store更新
    beforeRouteEnter: (to, from, next) => {
      // console.log(from);
      next(vm => {
        vm.$store.dispatch('setUserStatus', null).then(res => {
          vm.$toast.show(res, 1000);
        });
      })
    },
    methods: {
      ...mapActions(['setUserStatus']),
      async postInfoForReg() {
        const account = this.$refs.authPanel.registerAccount;
        const password = this.$refs.authPanel.registerPassword;
        const repeatPsw = this.$refs.authPanel.repeatRegisterPassword;
        const res = await postRegisterInfo(account, password, repeatPsw);
        console.log(res);
        const { code, msg } = res;
        if(code === 1) {
          this.$toast.show(msg, 1000, 'green', '10%');
          location.reload();
        }
        else{
          this.$toast.show(msg, 1000, 'red', '10%');
        }
      },
      async postLoginInfo() {
        const loginAccount = this.$refs.authPanel.loginAccount;
        const loginPassword = this.$refs.authPanel.loginPassword;
        const res = await postLoginInfo(loginAccount, loginPassword);
        console.log(res);
        const { code, msg, data } = res;

        if(code === 1) {
          const { user, token } = data;
          const { account, _id } = user;
          // 将帐号名和token放入sessionStorage中
          sessionStorage.setItem('userName', account);
          sessionStorage.setItem('userToken', token);
          // 将user对象和token通过actions.js中的异步方法放入vuex中(res.data包括user对象和token)
          const info = {account, token};
          const msg2 = await this.setUserStatus(info); // 把用户登录用vuex存储好再继续往下进行
          this.$router.go(-1);
          this.$toast.show(msg+', '+msg2, 3000, '#000000', '50%');
        }
        else{
          this.$toast.show(msg, 1000, 'red', '10%');
        }
      },
    },
  }
</script>

<style scoped>
  #auth {
    position: relative;
    height: 100vh;
    background-color: #fff;
    z-index: 1;
  }
</style>
