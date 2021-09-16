<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommendView",
    props: {
      recommends: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;
  }
  .recommend-item {
    flex: 1;
  }
  .recommend-item img {
    margin-bottom: 5px;
  }

  @media screen and (max-width: 506px) {
    .recommend-item img {
      width: 60px;
      height: 60px;
    }
    .recommend {
      font-size: 12px;
    }
  }

  @media screen and (min-width: 506px) and (max-width: 768px) {
    .recommend-item img {
      width: 75px;
      height: 75px;
    }
    .recommend {
      font-size: 12px;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 992px) {
    .recommend-item img {
      width: 95px;
      height: 95px;
    }
    .recommend{
      font-size: 16px;
    }
  }

  @media screen and (min-width: 992px) and (max-width: 1200px) {
    .recommend-item img {
      width: 125px;
      height: 125px;
    }
    .recommend{
      font-size: 18px;
    }
  }

  @media screen and (min-width: 1200px) {
    .recommend-item img {
      width: 155px;
      height: 155px;
    }
    .recommend{
      font-size:20px;
    }
  }

</style>
