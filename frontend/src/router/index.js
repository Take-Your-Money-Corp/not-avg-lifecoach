import Vue from "vue";
import VueRouter from "vue-router";
import ChatMessenger from "../views/ChatMessenger.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "ChatMessenger",
    component: ChatMessenger
  },
  {
    path: "/chat-analysis",
    name: "ChatAnalysis",
    component: () => import("../views/ChatAnalysis.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
