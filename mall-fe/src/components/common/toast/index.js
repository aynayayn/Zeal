import Toast from "./Toast";

const obj = {}

obj.install = function (Vue) {
  /*document.body.appendChild(Toast.$el);*/

  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast);

  // 2.new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastConstructor();

  // 3.将组件对象手动地挂载到某一个元素上
  toast.$mount(document.createElement('div'));

  // 4.挂载完了之后，toast.$el对应的就是div；然后再把toast.$el添加到body里边去
  document.body.appendChild(toast.$el);

  Vue.prototype.$toast = toast;
}

export default obj;
