import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import App from '@/App.vue';

import router from '@/router';
import store from '@/store';
import dynamicLoadComponents from '@/dynamicLoadComponents';

import resize from 'vue-element-resize-detector';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(resize);

Vue.config.productionTip = false;

dynamicLoadComponents();

window.app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
