<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartList.length}})</div>
    </nav-bar>
    <cart-list :list="cartList"></cart-list>
    <cart-bottom-bar :detection-list="cartList"
                     @changeCheckOfAll="changeCheckOfAll"></cart-bottom-bar>
    <product-number-ensure v-if="isShowNumEnsureFrame"
                           title="修改商品数量"
                           @ensureNumber="modifyCount"
                           @cancelClick="cancelClick"></product-number-ensure>
    <delete-ensure-frame v-if="isShowDeleteEnsureFrame"
                         @ensureClick="deleteItem"
                         @cancelClick="cancelClick2"></delete-ensure-frame>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";
  import ProductNumberEnsure from "components/content/ensureFrame/ProductNumberEnsure";
  import DeleteEnsureFrame from "components/content/ensureFrame/DeleteEnsureFrame";

  import {setStatusFromStorageWhenUpdate} from "common/mixin";

  import {mapGetters} from 'vuex';
  import {getCartListByAccount, setCartItemCheckedStatus, setStatusOfAllCartItem, modifyCartItemCount, deleteCartItemById} from "network/cart";

  export default {
    name: "Cart",
    mixins: [setStatusFromStorageWhenUpdate],
    data() {
      return {
        cartList: [],

        activeModifiedId: '',
        activeDeleteId: '',
        isShowNumEnsureFrame: false,
        isShowDeleteEnsureFrame: false,
      }
    },
    mounted() {
      this.$bus.$on('changeCheckState', (iid) => {
        this.changeCheckState(iid).then(res => {
          const status = res;
          setCartItemCheckedStatus(this.currentUser, iid, status).then(res => {
            console.log(res);
          });
        })
      });
      this.$bus.$on('modifyCount', (iid) => {
        this.activeModifiedId = iid;
        this.isShowNumEnsureFrame = true;
      });
      this.$bus.$on('jumpToDetail', (iid) => {
        this.$router.push('/detail/'+iid);
      });
      this.$bus.$on('deleteCartItem', (iid) => {
        this.activeDeleteId = iid;
        this.isShowDeleteEnsureFrame = true;
      });
    },
    activated() {
      console.log('cart_activated_test');
      const account = this.$store.getters.currentUser;
      // 先把cartList清空
      this.cartList = [];
      // 请求数据
      getCartListByAccount(account).then(res => {
        if(res.data) {
          this.cartList = res.data.cartList;
        }
        else {
          this.$toast.show('未获取到用户，需要您先登录', 1500);
        }
      });
    },
    computed: {
      ...mapGetters(['currentUser'])
    },
    methods: {
      changeCheckState(iid) {
        return new Promise((resolve, reject) => {
          const target = this.cartList.find(item => item.iid === iid);
          target.status = !target.status;
          this.cartList = JSON.parse(JSON.stringify(this.cartList)); // 使页面能跟着响应
          resolve(target.status);
        });
      },
      changeCheckOfAll(status) {
        this.cartList.forEach(item => {
          item.status = status;
        });
        this.cartList = JSON.parse(JSON.stringify(this.cartList)); // 使页面能跟着响应

        // 去更新数据库
        setStatusOfAllCartItem(this.currentUser, status).then(res => {
          console.log(res.msg);
        });
      },

      modifyCount(count) {
        this.isShowNumEnsureFrame = false;

        this.cartList.find(item => item.iid === this.activeModifiedId).count = count;
        this.cartList = JSON.parse(JSON.stringify(this.cartList));

        // 去同步修改数据库里的数据
        modifyCartItemCount(this.currentUser, this.activeModifiedId, count).then(res => {
          this.$toast.show(res.msg, 1500);
          this.activeModifiedId = '';
        });
      },
      cancelClick() {
        this.isShowNumEnsureFrame = false;
        this.activeModifiedId = '';
      },
      deleteItem() {
        this.isShowDeleteEnsureFrame = false;
        this.deleteLocalCartListItem(this.activeDeleteId).then(() => {
          deleteCartItemById(this.currentUser, this.activeDeleteId).then(res => {
            this.$toast.show(res.msg, 1500);
            this.activeDeleteId = '';
          })
        });
      },
      cancelClick2() {
        this.isShowDeleteEnsureFrame = false;
        this.activeDeleteId = '';
      },
      deleteLocalCartListItem(iid) {
        return new Promise((resolve, reject) => {
          this.cartList.splice(this.cartList.findIndex(item => item.iid === iid), 1);
          this.cartList = JSON.parse(JSON.stringify(this.cartList));

          resolve();
        });
      },
    },
    components: {
      NavBar,
      CartList,
      CartBottomBar,
      ProductNumberEnsure,
      DeleteEnsureFrame,
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
    position: relative;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #ffffff;
    /*font-weight: 700;*/
    font-weight: bold;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    z-index: 1;
  }
</style>
