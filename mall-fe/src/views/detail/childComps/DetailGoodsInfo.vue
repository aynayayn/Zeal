<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div v-for="item1 in detailInfo.detailImage">
      <div class="info-key">{{item1.key}}</div>
      <div class="info-list">
        <img v-for="(item2, index) in item1.list"
             :src="item2"
             :key="index"
             alt=""
             @load="detailInfoImageLoad">
      </div>
    </div>
  </div>
</template>

<script>
	import {debounce} from "common/utils";

  export default {
		name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Object,
        default() {
          return {}
        }
      },
    },
    data() {
		  return {
		    /*loadCounter: 0,
        imagesArray1Length: 0,*/

		    // 方案2第1处代码
		    newEmit: null,
      }
    },
    mounted() {
      // 方案2第2处代码
      function imgLoadAndEmit(){
		    // 目的：对下面这句代码进行防抖处理
        this.$emit('detailInfoImageLoad');
      }
		  this.newEmit = debounce(imgLoadAndEmit, 200);
    },
    methods: {
		  /*detailInfoImageLoad() {
        if(++this.loadCounter ===  this.imagesArray1Length) {
          this.$emit('detailInfoImageLoad');
        }
      }*/
		  // 方案1第1处代码(下一处代码在Detail.vue中的methods属性中)
		  /*detailInfoImageLoad() {
		   this.$emit('detailInfoImageLoad');
      }*/

      // 方案2第3处代码(第4处代码在Detail.vue中的methods属性中)
      detailInfoImageLoad() {
		    this.newEmit();
      }
    },
    watch: {
		  // 在数据还未到达时detailInfo为空对象，在有数据之后，将imagesArray1Length赋值
		  /*detailInfo() {
		    this.imagesArray1Length = this.detailInfo.detailImage[0].list.length;
      }*/
    }
	}
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>
