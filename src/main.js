import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuebar from "vuebar";
import vuetify from "./plugins/vuetify";
import store from "./store";
import "@/assets/css/main.sass";

Vue.config.productionTip = false;
Vue.use(Vuebar);

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
