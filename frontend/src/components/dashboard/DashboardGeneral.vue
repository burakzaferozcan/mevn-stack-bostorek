<template>
  <div class="row">
    <div class="col-lg-6">
      <h2 class="mg-4">User Infermation</h2>
      <form action="">
        <div class="mb-3">
          <label for="username">Username</label>
          <input
            type="text"
            :disabled="!editMode"
            v-model="userInfo.username"
            id="username"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="email">Email</label>
          <input
            type="email"
            :disabled="!editMode"
            v-model="userInfo.email"
            id="email"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="password">Password</label>

          <input
            type="Password"
            id="Password"
            :disabled="!editMode"
            v-model="userInfo.password"
            class="form-control"
          />
        </div>
        <button
          @click="!editMode ? toggleEditMode() : saveUserInfo()"
          class="btn btn-primary"
          type="button"
        >
          {{ editMode ? "Save" : "Edit" }}
        </button>
        <button
          v-if="editMode"
          @click="cancelEditMode"
          class="btn btn-primary"
          style="background-color: red !important; border-color: red !important"
          type="button"
        >
          Cancel
        </button>
      </form>
    </div>
    <div class="col-lg-6"></div>
  </div>
</template>

<script>
import { useAuthStore } from "../../stores/authStore.js";
import { useUserStore } from "../../stores/userStore.js";

import { mapState, mapActions } from "pinia";
import { useToast } from "vue-toastification";
export default {
  name: "DashboardGeneral",
  data() {
    return {
      userInfo: {
        username: "",
        email: "",
        password: "",
      },
      editMode: false,
    };
  },
  methods: {
    ...mapActions(useUserStore, ["updateUserDetails"]),
    ...mapActions(useAuthStore, ["logout"]),

    toggleEditMode() {
      this.editMode = !this.editMode;
    },
    async saveUserInfo() {
      try {
        await this.updateUserDetails(this.userInfo);
        const toast = useToast();
        toast.success("Please login with new details", {
          position: "top-right",
          timeout: 1000,
          closeButton: "button",
          icon: true,
          rtl: false,
        });
        setTimeout(() => {
          this.logout();
        }, 1000);
      } catch (error) {}
    },
    cancelEditMode() {
      this.editMode = false;
      this.userInfo.username = this.user.username;
      this.userInfo.email = this.user.email;

      this.userInfo.password = "";
    },
  },
  created() {
    this.userInfo.username = this.user.username;
    this.userInfo.email = this.user.email;
  },
  computed: {
    ...mapState(useAuthStore, ["user"]),
  },
};
</script>
