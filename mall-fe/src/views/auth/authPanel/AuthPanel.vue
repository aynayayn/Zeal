<template>
  <div class="content">
    <tab-control :titles="['登录', '注册']"
                 class="tab-control"
                 @tabClick="tabClick"/>
    <form v-if="isLoginPlate" key="login">
      <input class="account" type="text" placeholder="手机号/邮箱" autofocus>
      <input class="password" type="text" placeholder="密码">
      <button>登录</button>
    </form>
    <form v-if="isRegisterPlate" key="register">
      <input class="account" type="text" placeholder="手机号/邮箱" autofocus>
      <input class="password" type="text" placeholder="密码">
      <input class="invite" type="text" placeholder="邀请码">
      <button>注册</button>
    </form>
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
      }
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
  .content form input {
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
  .content form input:focus {
    border: 1px solid var(--color-high-text);
  }
  .content form input.account {
    background-image: url("~assets/img/auth/account.svg");
    background-size: 25px 25px;
    background-repeat: no-repeat;
    background-position: 5px 5px;
  }
  .content form input.password {
    background-image: url("~assets/img/auth/password.svg");
    background-size: 22px 22px;
    background-repeat: no-repeat;
    background-position: 5px 7px;
  }
  .content form input.invite {
    background-image: url("~assets/img/auth/invite.svg");
    background-size: 22px 22px;
    background-repeat: no-repeat;
    background-position: 5px 7px;
  }
  .content form button {
    width: 100%;
    height: 40px;
    border: 1px solid #e6e6e6;
    border-radius: 20px;
    background: var(--color-high-text);
    font-weight: bold;

    margin-top: 16px;
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
