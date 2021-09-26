import Vue from 'vue';
import VueRouter from "vue-router";

const Home = () => import('views/home/Home');
const Category = () => import('views/category/Category');
const Cart = () => import('views/cart/Cart');
const Profile = () => import('views/profile/Profile');
const Detail = () => import('views/detail/Detail');
const Auth = () => import('views/auth/Auth');

//1.安装插件
Vue.use(VueRouter);

//2.创建router
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: '首页'
    },
  },
  {
    path: '/category',
    component: Category,
    meta: {
      title: '分类'
    },
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      title: '购物车'
    },

  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: '个人主页'
    },
  },
  {
    path: '/detail/:id',
    component: Detail,
    meta: {
      title: '商品详情'
    },
  },
  {
    path: '/auth',
    component: Auth,
    meta: {
      title: '登陆注册'
    },
  },
]
const router = new VueRouter({
  routes,
  mode: 'history',
});

//3.导出
export default router
