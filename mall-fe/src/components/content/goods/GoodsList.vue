<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item"/>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
  export default {
    name: "GoodsList",
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      GoodsListItem,
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    /*设置弹性元素是否在弹性容器中中自动换行*/
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }
</style>
