import { createRouter, createWebHistory } from "vue-router";
import index from "../views/index.vue";
import profile from "../views/profile/index.vue";
const routes = [
  {
    path: "/",
    component: index,
  },
  {
    path: "/test",
    compoment: profile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
