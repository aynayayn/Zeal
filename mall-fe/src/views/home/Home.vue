<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">商城首页</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 :class="'tab-control-fixed'"
                 v-show="isShowTabControl"></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type = "3"
            @scroll="contentScroll"
            :pull-up-load = "true"
            @pullingUp = "loadMore">
      <home-swiper :banners="banners"
                   @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <home-feature-view/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top
      @click.native="backTopClick"
      v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommendView from "./childComps/HomeRecommendView";
  import HomeFeatureView from "./childComps/HomeFeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  // 后面使用了混入
  // import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {debounce} from "common/utils";
  // 三、只emit一个事件并在不同组件中实现各自不同时段的监听【混入操作】 - 第2处代码
  import {itemImageLoadListener, backTopClickListener} from "common/mixin";

  export default {
    name: "Home",
    mixins: [itemImageLoadListener, backTopClickListener],// 三、只emit一个事件并在不同组件中实现各自不同时段的监听【混入操作】 - 第3处代码
    components: {
      Scroll,
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,

      NavBar,
      TabControl,
      GoodsList,
      // BackTop, // 后面使用了混入
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isShowTabControl: false,
        saveY: 0,
        // itemImageLoad: null, // 二、只emit一个事件并在不同组件中实现各自不同时段的监听 - 第2处代码
        // isShowBackTop: false, // 后面通过混入加入
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      },
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata();

      //2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    mounted() {
      // 图片加载完成的事件监听【没有防抖处理】
      /*this.$bus.$on('itemImageLoad', () => {
        //在mounted阶段也不定找得到$refs.scroll
        this.$refs.scroll && this.$refs.scroll.refresh();
      })*/

      // 一、先判断当前路由后使用this.$bus.$emit发射不同的事件 - 第2处代码
      /* const refresh = debounce(this.$refs.scroll.refresh, 200)
       this.$bus.$on('homeItemImageLoad', () => {
         this.$refs.scroll && refresh();
       })*/


      // 二、只emit一个事件并在不同组件中实现各自不同时段的监听 - 第3处代码 - 后面进行了混入操作
     /*const refresh = debounce(this.$refs.scroll.refresh, 200);
     this.$bus.$on('itemImageLoad', () => {
       this.$refs.scroll && refresh();
     });*/
     // 为了等一下使用混入，把回调的函数抽出来
      /*const refresh = debounce(this.$refs.scroll.refresh, 200);
      this.itemImageLoad = () => {
        this.$refs.scroll && refresh();
      }
      this.$bus.$on('itemImageLoad', this.itemImageLoad);*/
    },
    activated() {
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0, this.saveY, 0);

      // 二、只emit一个事件并在不同组件中实现各自不同时段的监听 - 第4处代码
      /*this.$bus.$on('itemImageLoad', this.itemImageLoad);*/
    },
    /*beforeRouteLeave(from, to, next) {
      this.saveY = this.$refs.scroll.scroll.y;
      next();
    },*/
    deactivated() {
      // this.saveY = this.$store.state.scrollHeight;
      this.saveY = this.$refs.scroll.scroll.y;
      console.log(this.saveY);

      // 二、只emit一个事件并在不同组件中实现各自不同时段的监听 - 第5处代码
      // 三、只emit一个事件并在不同组件中实现各自不同时段的监听【混入操作】 - 第4处代码
      this.$bus.$off('itemImageLoad', this.itemImageLoad);
    },
    methods: {
      /*debounce(func, delay) {
        let timer = null;
        return function(...args) {
          if(timer)  clearTimeout(timer)

          timer = setTimeout(() => {
            func.apply(this, args)
          }, delay)
        }
      },*/
      /**
       * 事件监听相关的方法
       */
      tabClick(value) {
        switch(value) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }

        this.$refs.tabControl1.currentIndex = value;
        this.$refs.tabControl2.currentIndex = value;
      },
      // 后面通过混入加入
      /*backTopClick() {
        // 在500毫秒之内滚到最上方
        this.$refs.scroll.scrollTo(0, 0, 500);
      },*/
      contentScroll(position) {
        this.isShowTabControl = -position.y > this.tabOffsetTop;
        // this.isShowBackTop = -position.y > 1000;
        this.comparePositionYAnd1000(position.y); //专门把上句包成一个函数以便使用混入
      },
      loadMore() {
        this.getHomeGoods(this.currentType);
        // 2s后才finishPullUp，才能进行下一次上拉加载
        setTimeout(() => {
          this.$refs.scroll.finishPullUp();
        }, 2000)
      },
      swiperImageLoad() {
        // 获取tabControl的offsetTop
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        console.log(this.tabOffsetTop);
      },

      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
        })
      },
    },
    watch: {
      /*"$store.state.imgLoadedCount": {
        // 需要实时监听对象属性的变化得将deep属性设置为true
        deep: false,
        handler: function(){
          this.$refs.scroll.scroll.refresh();
        }
      }*/
      /*"$store.state.scrollHeight": {
        deep: false,
        handler: function(newVal) {
          this.isShowBackTop = -newVal > 1000;
          this.isShowTabControl = -newVal > this.tabOffsetTop;
          // console.log(newVal);
          // console.log(this.isTabFixed);
        }
      }*/
    }
  }
</script>

<style scoped>
  #home {
    position: relative;
    height: 100vh;
    z-index: 0;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: bold;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control-fixed {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;

    z-index: 1;
  }

</style>
