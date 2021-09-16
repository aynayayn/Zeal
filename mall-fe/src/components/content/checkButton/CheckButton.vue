<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default: false,
      }
    }
  }
</script>

<style scoped>
  .check-button {
    background-color:#fff;
    border: 1px solid #aaa;
    border-radius: 50%;
  }

  .check {
    background-color: var(--color-high-text);
    border: 1px solid #fff;
  }
</style>
