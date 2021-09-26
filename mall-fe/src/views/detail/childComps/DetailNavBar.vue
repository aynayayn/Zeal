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
          :key="index"
          :class="{'activeClass': currentIndex === index}">
          <span>{{item}}</span>
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
      itemClick(index) {
        this.currentIndex = index;
        this.$emit('titleClick', index);
        setTimeout(() => {
          this.currentIndex = index;
          console.log(this.currentIndex);
        }, 200);
      },
      backClick() {
        this.$router.back();
      },
      /*setCurrentIndex(val) {
        this.currentIndex = val;
      },*/
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
  .center-content-item span {
    padding-bottom: 6px;
  }
  .activeClass {
    color: var(--color-high-text);
  }
  .activeClass span {
    border-bottom: #222222 solid 3px;
  }
</style>
