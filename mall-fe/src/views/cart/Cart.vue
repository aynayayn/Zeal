<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import {mapGetters} from 'vuex';

  export default {
    name: "Cart",
    computed: {
      ...mapGetters(['cartLength'])
    },
     components: {
      NavBar,
      CartList,
      CartBottomBar,

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
