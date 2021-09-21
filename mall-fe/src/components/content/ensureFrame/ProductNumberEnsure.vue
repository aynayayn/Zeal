<template>
  <div class="product-number-1">
    <p>{{title}}</p>
    <div>
      <span><button @click="counter++">&nbsp;+&nbsp;</button></span>&nbsp;
      <span>{{counter}}</span>&nbsp;
      <span><button @click="counter--">&nbsp;-&nbsp;</button></span>
    </div>
    <div>
      <button class="cancel" @click="cancelClick">取消</button>&nbsp;
      <button class="ensure" @click="ensureNumClick">确认</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailProductNumberEnsure",
    props: {
      title: {
        type: String,
        default: '',
      },
    },
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
    background-color: var(--color-high-text);
    text-align: center;
    border-radius: 10px;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;

    font-size: 18px;
    padding-top: 7px;
    color: #000000;
  }
  .product-number-1 div {
    margin-top: 5px;
  }
  .product-number-1 div button.cancel, .product-number-1 div button.ensure {
    font-size: 13px;
    padding: 7px 14px;

    border: 1px solid var(--color-high-text);
    border-radius: 7px;
  }
</style>
