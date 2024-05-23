import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: HomeView },
    { path: "/about", component: () => import("../views/AboutView.vue") },
    { path: "/login", component: () => import("@/views/login.vue") },
  ],
});

export default router;
