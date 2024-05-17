<template>
  <div>
    <NavbarComponent />
    <RouterView />
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from "./components/FooterComponent.vue";
import NavbarComponent from "./components/NavbarComponent.vue";
export default {
  name: "App",
  components: {
    NavbarComponent,
    FooterComponent,
  },
  data() {
    return {};
  },
};
</script>

<style></style>
