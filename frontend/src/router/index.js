import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BooksView from "../views/BooksView.vue";
import ContactView from "../views/ContactView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import BookDetailView from "../views/BookDetailView.vue";
import DashboardView from "../views/DashboardView.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomeView, name: "home" },
    { path: "/books", component: BooksView, name: "books" },
    { path: "/books/:id", component: BookDetailView, name: "book-detail" },
    { path: "/contact", component: ContactView, name: "contact" },
    {
      path: "/dashboard",
      component: DashboardView,
      name: "dashboard",
      meta: { requiresAuth: true },
    },
    { path: "/login", component: LoginView, name: "login" },
    { path: "/register", component: RegisterView, name: "register" },
  ],
  linkActiveClass: "active-link",
});
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((url) => url.meta.requiresAuth);
  const isLoggedIn = localStorage.getItem("user");

  if (requiresAuth && !isLoggedIn) {
    next({ name: "login" });
  } else {
    next();
  }
});
export default router;
