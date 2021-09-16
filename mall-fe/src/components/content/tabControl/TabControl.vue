<template>
  <div class="tab-control">
    <!--<div v-for="(item, index) in titles"
         @click="tabClick(index)"
         class="tab-control-item">
      &lt;!&ndash;<span :style="(index===currentIndex)?activeStyle:{}">{{item}}</span>&ndash;&gt;
      <span :class="(index===currentIndex)?'activeClass':''">{{item}}</span>
    </div>-->
    <div v-for="(item, index) in titles"
         @click="itemClick(index)"
         :key="index"
         :class="{activeClass: index === currentIndex}"
         class="tab-control-item">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0,
        // activeStyle: {borderBottom: '3px solid deepPink', color: 'deepPink',},
      }
    },
    methods: {
      itemClick(val) {
        this.currentIndex = val;
        this.$emit('tabClick', val);
      },
      resetCurrentIndex() {
        this.currentIndex = 0;
        this.$emit('tabClick', 0);
      }
    },
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    width: 100%;
    text-align: center;
    line-height: 40px;
    font-size: 15px;
    background-color: #fff;
  }
  .tab-control-item {
    flex: 1;
  }
  .tab-control-item span {
    padding: 5px;
  }

  /*.activeClass {
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-high-text);
  }*/
  .activeClass {
    color: var(--color-high-text);
  }
  .activeClass span {
    border-bottom: 3px solid var(--color-high-text);
  }
</style>
