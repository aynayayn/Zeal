<template>
  <scroll class="content" ref="scroll">
    <cart-list-item v-for="(item,index) in list"
                    :cart-item="item"
                    :key="index">{{item}}</cart-list-item>
  </scroll>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";

  import {mapGetters} from 'vuex';
  export default {
    name: "CartList",
    props: {
      list: {
        type: Array,
        default() {
          return [];
        }
      },
    },
    /*computed: {
      ...mapGetters(['cartList']),
    },*/
    activated() {
      // 页面内容实际变长，但scroll插件的scrollerHeight却未刷新，因此导致页面不能滑动，所以要refresh
      this.$refs.scroll.refresh();
    },
    components: {
      Scroll,
      CartListItem,
    }
  }
</script>

<style scoped>
  .content {
    /*position: relative;
    margin-top: 44px;
    height: calc(100vh - 44px - 49px - 40px);
    overflow: hidden;*/

    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 89px;
  }
</style>
