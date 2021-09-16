<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" @load="imageLoad" alt="">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      imageLoad() {
        // this.$store.commit('incrementImgLoadedCount');

        // 一、先判断当前路由后使用this.$bus.$emit发射不同的事件 - 第1处代码
       /* if(this.$route.path.indexOf('/home') !== -1) {
          this.$bus.$emit('homeItemImageLoad');
        }
        if(this.$route.path.indexOf('/detail') !== -1) {
          this.$bus.$emit('recommendItemImageLoad')
        }*/

        // 二、只emit一个事件并在不同组件中实现各自不同时段的监听 - 第1处代码
        // 三、只emit一个事件并在不同组件中实现各自不同时段的监听【混入操作】 - 第2处代码
        this.$bus.$emit('itemImageLoad');
      },
      itemClick() {
        if(this.goodsItem.iid)
          this.$router.push('/detail/' + this.goodsItem.iid);
        // if(this.goodsItem.item_id)
        //   this.$router.push('/detail/' + this.goodsItem.item_id);
      },
    },
    computed: {
      showImage() {
        return this.goodsItem.image || this.goodsItem.img || this.goodsItem.show.img;
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }
  .goods-item img {
    width: 100%;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  /*通过伪元素放置一个icon*/
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
