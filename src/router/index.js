import { createRouter, createWebHistory } from "vue-router";
import LandingView from "../views/LandingView.vue";
import AboutView from "../views/AboutView.vue";
import BooksView from "../views/BooksView.vue";

export const routes = [
  {
    path: "/",
    name: "Home",
    component: LandingView,
    meta: {
      title: "Home",
      description:
        "Fin and Nance — a children's book series on financial literacy.",
    },
  },
  {
    path: "/about",
    name: "About the Author",
    component: AboutView,
    meta: {
      title: "About the Author",
      description:
        "Meet Maureen Patten, author and illustrator of the Fin and Nance children's book series.",
    },
  },
  {
    path: "/books",
    name: "Books",
    component: BooksView,
    meta: {
      title: "Books",
      description:
        "Browse the Fin and Nance chapter books — wholesome stories that teach saving, borrowing, bartering, and inflation.",
    },
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
