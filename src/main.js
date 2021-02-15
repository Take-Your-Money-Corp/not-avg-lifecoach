import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
const { dockStart } = require("@nlpjs/basic");

(async () => {
  const dock = await dockStart();
  const nlp = dock.get("nlp");
  await nlp.train();
})();
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
