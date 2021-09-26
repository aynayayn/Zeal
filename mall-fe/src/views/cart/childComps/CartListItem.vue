<template>
  <div id="shop-item">
    <div class="item-selector">
      <!--通过cartItem.checked的值(模型/数据库的值)来决定check-button显示的样式-->
      <check-button
        :isChecked="cartItem.status"
        @click.native="changeCheckState"></check-button>
    </div>
    <div class="item-img">
      <img :src="cartItem.image" alt="商品图片" @click="cartListItemClick">
    </div>
    <div class="item-info">
      <div class="item-title" @click="cartListItemClick">{{cartItem.title}}</div>
      <div class="item-desc">商品描述: {{cartItem.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{cartItem.price}}</div>
        <div class="delete-btn center" @click="deleteBtnClick">删除</div>
        <div class="item-count right" @click="countDivClick">x{{cartItem.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import {CHANGE_CHECK} from "store/mutations-types";

  export default {
    name: "CartListItem",
    props: {
      cartItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      changeCheckState() {
        // this.$store.commit(CHANGE_CHECK, this.cartItem.iid);
        this.$bus.$emit('changeCheckState', this.cartItem.iid);
      },
      countDivClick() {
        this.$bus.$emit('modifyCount', this.cartItem.iid);
      },
      cartListItemClick() {
        this.$bus.$emit('jumpToDetail', this.cartItem.iid);
      },
      deleteBtnClick() {
        this.$bus.$emit('deleteCartItem', this.cartItem.iid);
      },
    },
    components: {
      CheckButton,
    }
  }
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }
  .item-info .delete-btn {
    float: left;
    margin-left: 16px;
    border: 1px solid red;
    border-radius: 8px;
    font-size: 10px;
    padding: 2px 4px;
    background-color: #fc7b53;
    color: #000000;
    font-weight: bold;
  }
  .item-info .item-count {
    box-shadow: 2px 2px 6px #888888;
  }
</style>
