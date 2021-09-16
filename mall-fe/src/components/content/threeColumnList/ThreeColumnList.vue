<template>
  <div class="categories-more-detail">
    <three-column-list-item v-for="item in list" class="item-content">
      <a :href="item.link">
        <p><img v-lazy="item.image" alt="" @load="subItemImageLoad"></p>
        <p>{{item.title}}</p>
      </a>
    </three-column-list-item>
  </div>
</template>

<script>
  import ThreeColumnListItem from "./ThreeColumnListItem";
  export default {
    name: "ThreeColumnList",
    components: {
      ThreeColumnListItem,
    },
    props: {
      list: {
        type: Array,
        default() {
          return [];
        }
      },
    },
    methods: {
      subItemImageLoad() {
        this.$bus.$emit('itemImageLoad');
      }
    },
  }
</script>

<style scoped>
  .categories-more-detail {
    display: flex;
    /*设置弹性元素是否在弹性容器中中自动换行*/
    flex-wrap: wrap;
    justify-content: space-between;

    padding: 2px;
  }
  .categories-more-detail .item-content p {
     text-align: center;
   }
  .categories-more-detail .item-content p img {
    width: 100%;
  }

  /*以下是媒体响应*/
  @media screen and (max-width: 506px) {
    .categories-more-detail .item-content p {
      font-size: 12px;
    }
    .categories-more-detail .item-content p img {
      width: 100%;
    }
  }

  @media screen and (min-width: 506px) and (max-width: 768px) {
    .categories-more-detail .item-content p {
      font-size: 13px;
    }
    .categories-more-detail .item-content p img {
      width: 90%;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 992px) {
    .categories-more-detail .item-content p {
      font-size: 14px;
    }
    .categories-more-detail .item-content p img {
      width: 80%;
    }
  }

  @media screen and (min-width: 992px) and (max-width: 1200px) {
    .categories-more-detail .item-content p {
      font-size: 15px;
    }
    .categories-more-detail .item-content p img {
      width: 70%;
    }
  }

  @media screen and (min-width: 1200px) {
    .categories-more-detail .item-content p {
      font-size: 16px;
    }
    .categories-more-detail .item-content p img {
      width: 56%;
    }
  }
</style>
