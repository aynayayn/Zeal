<template>
  <div class="center-frame">
    <p>确认删除？</p>
    <div>
      <button class="cancel" @click="cancelClick">取消</button>&nbsp;
      <button class="ensure" @click="ensureClick">确认</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailProductNumberEnsure",
    methods: {
      ensureClick() {
        this.$emit('ensureClick');
      },
      cancelClick() {
        this.$emit('cancelClick');
      }
    }
  }
</script>

<style scoped>
  .center-frame {
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

    opacity: .9;
  }
  .center-frame p {
    margin-top: 20px;
    font-size: 18px;
    color: #000000;
  }
  .center-frame div {
    margin-top: 10px;
  }
  .center-frame div button {
    font-size: 14px;
    padding: 8px 16px;
    border: 1px var(--color-high-text) solid;
    border-radius: 4px;
    color: #fff;

    outline: none;
  }
  .center-frame div button.cancel {
    background-color: green;
  }
  .center-frame div button.ensure {
    background-color: red;
  }
</style>
