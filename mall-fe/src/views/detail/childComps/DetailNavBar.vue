<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="center-content">
        <div
          v-for="(item, index) in titles"
          class="center-content-item"
          @click="itemClick(index)"
          :class="{activeClass: index == currentIndex}">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    data() {
      return{
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0,
      }
    },
    methods: {
      itemClick(val) {
        this.currentIndex = val;
        this.$emit('titleClick', val);
      },
      backClick() {
        this.$router.back();
      }
    },
    components: {
      NavBar,
    },
  }
</script>

<style scoped>
  .back img {
    margin-top: 10px;
  }
  .center-content {
    display: flex;
    font-size: 16px;
  }
  .center-content-item {
    flex: 1;
  }
  .activeClass {
    color: var(--color-high-text)
  }
</style>
