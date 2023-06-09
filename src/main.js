import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// // 引入vant
// import vant from "@/ui";
// // 使用vant
// Vue.use(vant);
import Vue2TouchEvents from "vue2-touch-events";

Vue.use(Vue2TouchEvents);
// ------------------
// const cors = require("cors");
// import cors from "cors";
// Vue.use(cors);
// ------------------

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
