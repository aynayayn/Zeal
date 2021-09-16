<template>
  <div class="sidebar">
    <ul>
      <li v-for="(item, index) in list"
          :class="{isClick: currentIndex === index}"
          @click="itemClick(index)">{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "SideBar",
    props: {
      list: {
        type: Array,
        default() {
          return [];
        }
      },
    },
    data() {
      return {
        currentIndex: 0
      };
    },
    methods: {
      itemClick(val) {
        this.currentIndex = val;
        this.$emit('selectItem', val);

        console.log('testClick');
      },
      changeCurIndexAndEmit() {
        if(this.currentIndex < this.list.length - 1) {
          this.currentIndex++;
          this.$emit('selectItem', this.currentIndex);
        }
      },
    },
  }
</script>

<style scoped>
  .sidebar {
    background-color: #eee;
  }
  .sidebar li {
    height: 45px;
    font-size: 14px;
    line-height: 45px;
    text-align: center;
  }
  .isClick {
    background-color: var(--color-background);
    color: var(--color-tint);
    font-weight: bold;

    border-left: 4px var(--color-high-text) solid;
  }
</style>
