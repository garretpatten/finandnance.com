import { createRouter, createWebHistory } from "vue-router";
import LandingView from "../views/LandingView.vue";
import AboutView from "../views/AboutView.vue";
import BooksView from "../views/BooksView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: LandingView,
    meta: { title: "Home" },
  },
  {
    path: "/about",
    name: "About the Author",
    component: AboutView,
    meta: { title: "About the Author" },
  },
  {
    path: "/books",
    name: "Books",
    component: BooksView,
    meta: { title: "Books" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_, __, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return { top: 0, left: 0 };
  },
});

export default router;
