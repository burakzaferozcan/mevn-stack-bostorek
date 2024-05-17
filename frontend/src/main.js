import "bootstrap/dist/css/bootstrap.min.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faThumbsUp,
  faArrowLeft,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import {
  faThumbsUp as farThumsUp,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
import { createPinia } from "pinia";
import { useBookStore } from "./stores/bookStore";
import { useAuthStore } from "./stores/authStore";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import "./assets/styles.css";
import axios from "axios";
import { useToast } from "vue-toastification";

library.add(faArrowLeft, faThumbsUp, faPenToSquare, faTrash, farThumsUp);
const pinia = createPinia();
const authStore = useAuthStore(pinia);
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const toast = useToast();

      toast.error("Your token has expired, forwarding login page", {
        position: "top-center",
        timeout: 3000,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
      setTimeout(() => {
        authStore.logout();
        router.push("/login");
      }, 3000);
    }
  }
);
const storedUser = localStorage.getItem("user");
if (storedUser) {
  const userData = JSON.parse(storedUser);
  useAuthStore(pinia).user = userData.user;
  const token = userData.token;
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}
const bookStore = useBookStore(pinia);
bookStore.fetchBooks().then(() => {
  const app = createApp(App);
  app
    .use(pinia)
    .use(router)
    .component("font-awesome-icon", FontAwesomeIcon)
    .use(Toast)
    .mount("#app");
});
