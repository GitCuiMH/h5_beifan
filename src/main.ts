
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store';

Vue.config.productionTip = false;
import '@/styles/index.scss'

import selfMsgBox from '@/components/selfMsgBox/index'
Vue.use(selfMsgBox)
import selfProm from '@/components/selfprom/index'
Vue.use(selfProm)
import Vant from 'vant';
import 'vant/lib/index.css';
import { Toast } from 'vant';
Vue.use(Toast);
Vue.prototype.$toast = Toast
Vue.use(Vant);
import selfConfirm from '@/components/selfConfirm/index'
Vue.use(selfConfirm)


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
