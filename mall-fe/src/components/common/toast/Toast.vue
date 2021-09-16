<template>
  <div class="toast" v-show="isShow">
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
      }
    },
    methods: {
      show(message = '默认文字', duration = 2000) {
        this.message = message;
        this.isShow = true;

        setTimeout(() => {
          this.isShow = false;
          this.message = '';
        }, duration)
      },
    },
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    padding: 8px 10px;
    border-radius: 10px;

    background-color: rgba(0, 0, 0, .8);
    color: #ffffff;

    z-index: 2;
  }
</style>
