<template>
  <nav class="navbar navbar-expand-md custom-nav">
    <div class="container">
      <router-link :to="{ name: 'home' }" class="navbar-brand">asd</router-link>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link :to="{ name: 'home' }" class="nav-link"
            >Home</router-link
          >
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'books' }" class="nav-link"
            >Books</router-link
          >
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'contact' }" class="nav-link"
            >Contact Us</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            :to="{ name: 'dashboard' }"
            class="nav-link"
            v-if="isLoggedIn"
            >Dashboard</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            :to="{ name: 'login' }"
            class="nav-link"
            v-if="!isLoggedIn"
            >Login</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            :to="{ name: 'register' }"
            class="nav-link"
            v-if="!isLoggedIn"
            >Register</router-link
          >
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <button class="nav-link" @click="logoutUser">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from "../stores/authStore.js";
import { mapState, mapActions } from "pinia";
export default {
  name: "NavbarComponent",
  data() {
    return {
      brandName: "Bostorek",
    };
  },
  computed: {
    ...mapState(useAuthStore, ["isLoggedIn"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["logout"]),
    logoutUser() {
      this.logout();
    },
  },
};
</script>

<style scoped>
.custom-nav {
  background-color: var(--primary-color);
  padding: 15px 0;
}
.navbar-brand {
  padding: 0;
  margin: 0;
  color: white;
  font-weight: bold;
}
.nav-link {
  padding: 10px 15px !important;
  text-align: center;
  color: white;
}
.nav-link:hover {
  color: var(--secondary-color);
}
.active-link {
  color: var(--secondary-color);
}
</style>
