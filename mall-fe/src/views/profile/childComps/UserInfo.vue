<template>
  <div class="userInfo">
    <div class="info-left">
      <slot name="user-icon">
        <svg class="img-svg">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
        </svg>
      </slot>
    </div>

    <div class="info-center">
      <slot name="user-nickname">
        <div @click="clickToJump">登录/注册</div>
      </slot>
      <div class="phone">
        <span>
          <svg data-v-735ff1be="" fill="#fff" class="icon-mobile">
            <use data-v-735ff1be="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
          </svg>
        </span>
        <span class="text"><slot name="user-phone">暂无绑定手机号</slot></span>
      </div>
    </div>

    <div class="info-right" @click="clickToJump">
      <svg data-v-735ff1be="" fill="#fff" class="arrow-svg">
        <use data-v-735ff1be="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
      </svg>
    </div>
  </div>
</template>

<script>
  export default {
    name: "UserInfo",
    methods: {
      clickToJump() {
        if(!this.$store.getters.isLogin) {
          this.$emit('go2auth');
        }
      }
    }
  }
</script>

<style scoped>
  .userInfo {
    position: relative;
    margin-top: 44px;
    width: 100%;
    height: 20%;
    padding: 20px;

    background-color: var(--color-high-text);

    display: flex;
    align-items: center;
  }
  .info-left {
    width: 60px;
    height: 60px;
  }
  .img-svg {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;
  }

  .info-center {
    width: 70%;
    margin-left: 20px;
    /*第一步(不换行)：white-space:nowrop;（对于连续的数字或者英文字母可省略）*/
    white-space: nowrap;
    /*第二步：溢出隐藏*/
    overflow: hidden;
    /*第三步：溢出的文本代以省略号*/
    text-overflow:ellipsis;

    color: #fff;
  }
  .info-center .phone {
    position: relative;

    margin-top: -4px;
    margin-left: 15px;
    font-weight: 300;
  }
  .info-center .phone .icon-mobile {
    position: absolute;
    width: 12px;
    height: 18px;
    left: -15px;
    top: 6px;
  }
  .info-center .phone .text {
    font-size: 13px;
  }

  /*以下两个样式类进行媒体查询*/
  .info-right {
    flex: 1;
    /*flex盒子里再套一个flex盒子*/
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .info-right .arrow-svg {
    width: 12px;
    height: 24px;
  }

  /*媒体查询*/
  @media screen and (max-width: 506px) {
    .info-right {
      width: 30px;
      text-align: right;
    }
    .info-right .arrow-svg {
      width: 12px;
      height: 24px;
    }
    .info-center {
      width: 60%;
    }
  }

  @media screen and (min-width: 506px) and (max-width: 768px) {
    .info-right {
      width: 50px;
      text-align: left;
    }
    .info-right .arrow-svg {
      width: 12px;
      height: 24px;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 992px) {
    .info-right {
      width: 70px;
      text-align: left;
    }
    .info-right .arrow-svg {
      width: 14px;
      height: 28px;
    }
  }

  @media screen and (min-width: 992px) and (max-width: 1200px) {
    .info-right {
      width: 90px;
      text-align: left;
    }
    .info-right .arrow-svg {
      width: 16px;
      height: 32px;
    }
    .info-center {
      width: 80%;
    }
  }

  @media screen and (min-width: 1200px) {
    .info-right {
      width: 110px;
      text-align: left;
    }
    .info-right .arrow-svg {
      width: 20px;
      height: 40px;
    }
    .info-center {
      width: 80%;
    }
  }

</style>
