<template>
  <div id="shop-item">
    <div class="item-selector">
      <!--通过cartItem.checked的值(模型/数据库的值)来决定check-button显示的样式-->
      <check-button
        :isChecked="cartItem.checked"
        @click.native="changeCheckState"></check-button>
    </div>
    <div class="item-img">
      <img :src="cartItem.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{cartItem.title}}</div>
      <div class="item-desc">商品描述: {{cartItem.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{cartItem.price}}</div>
        <div class="item-count right">x{{cartItem.count}}</div>
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
        this.$store.commit(CHANGE_CHECK, this.cartItem.iid);
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
</style>
