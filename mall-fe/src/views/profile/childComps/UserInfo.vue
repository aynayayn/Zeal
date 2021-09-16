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
        <div>登录/注册</div>
      </slot>
      <div class="phone">
        <span>
          <svg data-v-735ff1be="" fill="#fff" class="icon-mobile">
            <use data-v-735ff1be="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
          </svg>
        </span>
        <span><slot name="user-phone">暂无绑定手机号</slot></span>
      </div>
    </div>

    <div class="info-right">
      <svg data-v-735ff1be="" fill="#fff" class="arrow-svg">
        <use data-v-735ff1be="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
      </svg>
    </div>
  </div>
</template>

<script>
  export default {
    name: "UserInfo"
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
    flex: 1;
    margin-left: 20px;

    color: #fff;
  }
  .info-center .phone {
    position: relative;

    font-size: 13px;
    margin-top: 5px;
    margin-left: 15px;
    font-weight: 300;
  }
  .info-center .phone .icon-mobile {
    position: absolute;
    width: 12px;
    height: 18px;
    left: -15px;
    top: 0px;
  }

  /*以下两个样式类进行媒体查询*/
  .info-right {
    width: 30px;
    text-align: right;
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
  }

</style>
