import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from "vuelidate";
import RepositoryProvider from "@/providers/RepositoryProvider";

Vue.config.productionTip = false
Vue.use(Vuelidate);
Vue.use(ToastPlugin)
Vue.use(ModalPlugin, {
	BModal: { noCloseOnBackdrop: true, noCloseOnEsc: true },
})

new Vue({
  router,
  provide: RepositoryProvider,
  render: h => h(App)
}).$mount('#app')
