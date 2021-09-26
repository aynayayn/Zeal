<template>
  <div class="bottom-bar">
    <div class="check-all-zone">
      <check-button
        class="check-all-button"
        :is-checked="ifCheckAll"
        @click.native="changeCheckOfAll"></check-button>
      <span>全选</span>
    </div>

    <div class="total-price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate"
         @click="checkSelectedIfEqual0">
      去结算({{checkedProductNumber}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import {CHANGE_CHECK_OF_ALL} from "store/mutations-types";
  import {mapGetters} from 'vuex';

  export default {
    name: "CartBottomBar",
    props: {
      detectionList: {
        type: Array,
        data() {
          return undefined;
        }
      }
    },
    data() {
     return {
       ifCheckAll_data: false,
     }
    },
    methods: {
      changeCheckOfAll() {
        if(this.currentUser && this.userToken && this.isLogin) {
          this.$emit('changeCheckOfAll', !this.ifCheckAll_data);
        }
      },
      checkSelectedIfEqual0() {
        if(this.checkedProductNumber === 0) {
          this.$toast.show('请选择购买商品', 1500);
        }
      }
    },
    computed: {
      ...mapGetters(['cartList', 'cartLength','currentUser', 'userToken', 'isLogin']),
      ifCheckAll() {
        if(this.detectionList.length === 0) {
          this.ifCheckAll_data = false;
          return false;
        }
        else{
          for(let val of this.detectionList) {
            if(val.status === false) {
              this.ifCheckAll_data = false;
              return false;
            }
          }
          this.ifCheckAll_data = true;
          return true;
        }
      },
      totalPrice() {
        return '￥' + this.detectionList.filter(item => item.status).reduce((total, item) => {
          return total + item.price * item.count;
        }, 0).toFixed(2);
      },
      checkedProductNumber() {
        return this.detectionList.filter(item => item.status).reduce((total, item) => {
          return total + item.count;
        }, 0);
      }
    },
    components: {
      CheckButton,
    },
  }
</script>

<style scoped>
  .bottom-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 49px;

    height: 40px;
    background-color: #eee;

    display: flex;
  }
  .check-all-zone {
    display: flex;
    align-items: center;

    margin-left: 10px;
    width: 70px;
  }
  .check-all-button {
    width: 22px;
    height: 22px;
    padding-left: 2px;
    padding-bottom: 2px;
  }
  .check-all-zone span {
    line-height: 40px;
    font-size: 18px;
    margin-left: 5px;
  }
  .total-price {
    margin-left: 20px;
    line-height: 40px;
    font-size: 16px;

    flex: 1;
  }
  .calculate {
    line-height: 40px;
    font-size: 16px;

    width: 86px;

    background-color: var(--color-high-text);
    text-align: center;
    color: #fff;
  }
</style>
