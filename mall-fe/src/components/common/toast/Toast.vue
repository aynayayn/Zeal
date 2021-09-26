<template>
  <div class="toast-general"
       v-show="isShow"
       :style="{backgroundColor: bgColor, top: fixedTop, opacity: alphaNum}">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
   /* props: {
      message: {
        type: String,
        default: '',
      }
    },*/
    data() {
      return {
        isShow: false,
        message: '',
        bgColor: '',
        fixedTop: '',
        alphaNum: '',
      }
    },
    methods: {
      show(message = '默认文字', duration = 2000, bgColor = '#000000', fixedTop = '50%', alpha = '0.8') {
        this.message = message;
        this.bgColor = bgColor;
        this.fixedTop = fixedTop;
        this.alphaNum = alpha;
        this.isShow = true; // 注意：先赋值再改变可见性比较好

        // duration时间之后重置前面被改变的东西
        setTimeout(() => {
          this.isShow = false;
          this.message = '';
          this.bgColor = '';
          this.fixedTop = '';
          this.alphaNum = '';
        }, duration)
      },
    },
  }
</script>

<style scoped>
  .toast-general {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    padding: 8px 12px;
    border-radius: 10px;

    background-color: #000000;
    opacity: 0.8;
    color: #ffffff;

    z-index: 2;
    font-size: 14px;
  }
</style>
