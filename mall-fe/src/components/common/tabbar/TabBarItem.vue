<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    data() {
      return {
        // isActive: false
      }
    },
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'darkOrange'
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1;
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        this.$router.push(this.path)
      }
    }
  }
</script>

<style scoped>

  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
    color: #000000;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    /*去掉图片下方默认的3px像素*/
    vertical-align: middle;
    margin-bottom: 2px;
  }

</style>
