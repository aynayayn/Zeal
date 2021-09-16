<template>
  <div id="auth">
    <auth-panel></auth-panel>
  </div>
</template>

<script>
  import AuthPanel from "./authPanel/AuthPanel";
  export default {
    name: "Auth",
    components: {
      AuthPanel,
    },
  }
</script>

<style scoped>
  #auth {
    position: relative;
    height: 100vh;
    background-color: #fff;
    z-index: 1;
  }
</style>
