<template>
  <div class="product-number-1">
    <p>商品添加数量</p>
    <div>
      <span><button @click="counter++">&nbsp;+&nbsp;</button></span>&nbsp;
      <span>{{counter}}</span>&nbsp;
      <span><button @click="counter--">&nbsp;-&nbsp;</button></span>
    </div>
    <div>
      <button @click="cancelClick">取消</button>&nbsp;
      <button @click="ensureNumClick">确认</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailProductNumberEnsure",
    data() {
      return {
        counter: 1,
      }
    },
    methods: {
      ensureNumClick() {
        this.$emit('ensureNumber', this.counter);
      },
      cancelClick() {
        this.$emit('cancelClick');
      }
    }
  }
</script>

<style scoped>
  .product-number-1 {
    width: 200px;
    height: 100px;
    background-color: darkgray;
    text-align: center;
    border-radius: 10px;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .product-number-1 div {
    margin-top: 5px;
  }
</style>
