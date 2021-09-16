<template>
  <div id="profile">
    <nav-bar class="nav-bar">
      <div slot="center">个人主页</div>
    </nav-bar>
    <user-info></user-info>

    <div class="account-info">
      <div class="account-info-item">
        <div class="content">
          <span class="number">0.00</span>元
        </div>
        <div class="title">我的余额</div>
      </div>
      <div class="account-info-item">
        <div class="content">
          <span class="number">0</span>个
        </div>
        <div class="title">我的优惠</div>
      </div>
      <div class="account-info-item">
        <div class="content">
          <span class="number">0</span>分
        </div>
        <div class="title">我的积分</div>
      </div>
    </div>

    <list-view :list-data="orderList"
               class="list-view"></list-view>

    <list-view :list-data="serviceList"
               class="list-view"></list-view>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import UserInfo from "./childComps/UserInfo";
  import ListView from "./childComps/ListView";
  export default {
    name: "Profile",
    components: {
      NavBar,
      UserInfo,
      ListView,
    },
    data() {
      return {
        orderList: [
          {icon: '#order', iconColor: '#fc7b53', info: '我的消息'},
          {icon: '#point', iconColor: '#fc7b53', info: '积分商城'},
          {icon: '#vip', iconColor: '#fc7b53', info: '会员卡'},
        ],
        serviceList: [
          {icon: '#service', iconColor: '#fc7b53', info: '我的购物车'},
          {icon: '#download', iconColor: '#fc7b53', info: '下载购物APP'},
        ],
      }
    }
  }
</script>

<style scoped>
  #profile {
    position: relative;
    height: 100vh;

    background-color: #eeeeee;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: bold;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
  }

  .account-info {
    display: flex;
    /*垂直方向上居中对齐弹性盒子*/
    align-items: center;
    /*按照每个弹性盒子的宽度为32%，那么就还有100%-32%*3=4%的宽度，这剩余的4%的宽度会平均分配给3-1=2个间隙*/
    justify-content: space-between;
    width: 100%;

    padding: 20px 0;
    background-color: #fff;
  }
  .account-info .account-info-item {
    width: 32%;
    /*弹性盒子里面的内容在水平方向上居中*/
    text-align: center;

    font-size: 14px;
  }
  .account-info .account-info-item .content {
    margin-bottom: 5px;
  }
  .account-info .account-info-item .content .number {
    font-size: 30px;
    color: #fc7b53;
  }

  .list-view {
    margin-top: 10px;
  }
</style>
