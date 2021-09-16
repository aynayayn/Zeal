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
    data() {
     return {
       ifCheckAll_data: true,
     }
    },
    methods: {
      changeCheckOfAll() {
        // 修改cartList中属性的checked值，进而响应式地表现在页面样式上
        this.$store.commit(CHANGE_CHECK_OF_ALL, !this.ifCheckAll_data);
        // 其实这里不需要这句，因为把全部的cartList中属性的checked值修改后，computed中的ifCheckAll会进行计算，这样data中的ifCheckAll_data便有了新的正确的值
        // this.ifCheckAll_data = !this.ifCheckAll_data;
      },
      checkSelectedIfEqual0() {
        if(this.checkedProductNumber === 0) {
          this.$toast.show('请选择购买商品', 1500);
        }
      }
    },
    computed: {
      ...mapGetters(['cartList', 'cartLength']),
      ifCheckAll() {
        if(this.cartLength === 0) {
          this.ifCheckAll_data = false;
          return false;
        }
        else{
          for(let key in this.$store.state.cartList) {
            if(this.$store.state.cartList[key].checked === false) {
              this.ifCheckAll_data = false;
              return false;
            }
          }
          this.ifCheckAll_data = true;
          return true;
        }
      },
      totalPrice() {
        /*return this.$store.state.cartList.filter(item => {
          return item.checked;
        }).reduce((total, item) => {
          return total + item.price * item.count;
        }, 0).toFixed(2);*/
        let total = 0;
        for (let key in this.$store.state.cartList) {
          if(this.$store.state.cartList[key].checked) {
            total += this.$store.state.cartList[key].price * this.$store.state.cartList[key].count;
          }
        }
        return '￥' + total.toFixed(2);
      },
      checkedProductNumber() {
        let number = 0;
        for (let key in this.$store.state.cartList) {
          if(this.$store.state.cartList[key].checked) {
            number += this.$store.state.cartList[key].count;
          }
        }
        return number;
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
