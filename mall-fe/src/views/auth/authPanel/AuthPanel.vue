<template>
  <div class="content">
    <tab-control :titles="['登录', '注册']"
                 class="tab-control"
                 @tabClick="tabClick"/>
    <div class="form" v-if="isLoginPlate" key="login">
      <input id="loginAccount" ref="loginAccount" class="account" type="text" placeholder="手机号/邮箱" v-model="loginAccount" autofocus>
      <input class="password" type="password" v-model="loginPassword" placeholder="密码">
      <button @click="loginBtnClick">登录</button>
      <a href="javascript:;">忘记密码</a>
    </div>
    <div class="form" v-if="isRegisterPlate" key="register">
      <input id="registerAccount" ref="registerAccount" class="account" type="text" placeholder="手机号/邮箱" v-model="registerAccount" autofocus>
      <input class="password" type="password" placeholder="密码" v-model="registerPassword">
      <input class="repeatpsw" type="password" placeholder="再次输入密码" v-model="repeatRegisterPassword">
      <button @click="registerBtnClick">注册</button>
    </div>
  </div>
</template>

<script>
  import TabControl from "components/content/tabControl/TabControl";

  export default {
    name: "AuthPanel",
    components: {
      TabControl,
    },
    data() {
      return {
        isLoginPlate: true,
        isRegisterPlate: false,
        registerAccount: '',
        registerPassword: '',
        repeatRegisterPassword: '',
        loginAccount: '',
        loginPassword: '',

        loginAccountInput: null,
        registerAccountInput: null,
      }
    },
    created() {
      this.$nextTick(() => {
        this.loginAccountInput  = document.getElementById('loginAccount');
        this.registerAccountInput  = document.getElementById('registerAccount');
      })
    },
    methods: {
      tabClick(val) {
        switch (val) {
          case 0:
            this.isLoginPlate = true;
            this.isRegisterPlate = false;
            break;
          case 1:
            this.isRegisterPlate = true;
            this.isLoginPlate = false;
            break;
          default:
            this.isLoginPlate = true;
            this.isRegisterPlate = false;
            break;
        }
      },
      registerBtnClick() {
        // 点击注册按钮之后，前端的表单验证逻辑
        if(this.registerAccount === '') {
          this.$toast.show('账号不能为空', 1000, '#ff8c00', '10%', 1);
          return;
        }
        if(this.registerPassword === '' || this.repeatRegisterPassword === '') {
          this.$toast.show('请输入密码', 1000, '#ff8c00', '10%', 1);
          return;
        }
        if(this.registerPassword !== this.repeatRegisterPassword) {
          this.$toast.show('两次输入密码不一致', 1000, '#ff8c00', '10%', 1);
          return;
        }

        this.$emit('postInfoForReg');
      },
      loginBtnClick() {
        // 点击登录按钮之后，前端的表单验证逻辑
        if(this.loginAccount === '') {
          this.$toast.show('账号不能为空', 1000, '#ff8c00', '10%', 1);
          return;
        }
        if(this.loginPassword === '') {
          this.$toast.show('请输入密码', 1000, '#ff8c00', '10%', 1);
          return;
        }

        this.$emit('postInfoForLogin');
      },
    },
  }
</script>

<style scoped>
  .content {
    margin-top: 30%;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
  .content .tab-control {
    margin-bottom: 16px;
  }
  .content .form input {
    width: 100%;
    height: 38px;
    margin-bottom: 20px;
    border: 1px solid #e6e6e6;
    border-radius: 20px;
    text-align: center;

    font-size: 18px;

    /*去掉input的边框*/
    outline: none;
  }
  .content .form input:focus {
    border: 1px solid var(--color-high-text);
  }
  .content .form input.account {
    background-image: url("~assets/img/auth/account.svg");
    background-size: 25px 25px;
    background-repeat: no-repeat;
    background-position: 5px 5px;
  }
  .content .form input.password {
    background-image: url("~assets/img/auth/password.svg");
    background-size: 22px 22px;
    background-repeat: no-repeat;
    background-position: 5px 7px;
  }
  .content .form input.repeatpsw {
    background-image: url("~assets/img/auth/repeat.svg");
    background-size: 22px 22px;
    background-repeat: no-repeat;
    background-position: 5px 7px;
  }
  .content .form button {
    width: 100%;
    height: 40px;
    border: 1px solid #e6e6e6;
    border-radius: 20px;
    background: var(--color-high-text);
    font-weight: bold;

    margin-top: 16px;
    margin-bottom: 5px;
  }

  @media screen and (max-width: 506px) {
    .content {
      width: 90%;
    }
  }

  @media screen and (min-width: 506px) and (max-width: 768px) {
    .content {
      width: 80%;
      margin-top: 24%;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 992px) {
    .content {
      width: 60%;
      margin-top: 18%;
    }
  }

  @media screen and (min-width: 992px) and (max-width: 1200px) {
    .content {
      width: 50%;
      margin-top: 14%;
    }
  }

  @media screen and (min-width: 1200px) {
    .content {
      width: 40%;
      margin-top: 10%;
    }
  }
</style>
