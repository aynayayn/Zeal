<template>
  <div class="item">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "ThreeColumnListItem",
  }
</script>

<style scoped>
  .item {
    width: 32%;
    margin-top: 10px;
  }
</style>
