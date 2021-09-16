<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      pullUpLoad: {
        type: [Boolean, Object],
        default: false,
      }
    },
    data() {
      return {
        scroll: null,
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,

        // 以下三种属性写死
        click: true, // 用于使得div，span等之类的标签可以被点击
        mouseWheel: true,
        observeDOM: true,
        // 使不用F5刷新就能直接进行滑动
        disableMouse: false, // 启用鼠标拖动
        disableTouch: false, // 启用手指触摸
      });

      // 监听滚动的位置
      if(this.probeType == 2 || this.probeType == 3){
        this.scroll.on('scroll', (position) => {
          // this.$store.commit('setScrollHeight',position.y)
          this.$emit('scroll', position);
        })
      }

      // 监听scroll滚动到底部
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp');
        })
      }
    },
    methods: {
      scrollTo(x, y, time = 300) {
        this.scroll && this.scroll.scrollTo(x, y, time);
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp();
      },
      refresh() {
        console.log('----防抖处理测试----');
        this.scroll && this.scroll.refresh();
      },
    }
  }
</script>

<style scoped>

</style>
