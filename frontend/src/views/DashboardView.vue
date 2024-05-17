<template>
  <section class="full-section-height" style="min-height: calc(100vh-130px)">
    <div class="container py-5">
      <ul class="nav nav-tabs" id="dashboardTab" role="tablist">
        <li class="nav-item" role="presentation" @click="activeTab = 'general'">
          <button
            class="nav-link"
            id="general-tab"
            data-bs-toggle="#general-tab-pane"
            data-bs-target="tab"
            type="button"
            role="tab"
            aria-controls="general-tab-pane"
            aria-selected="true"
            :class="{ active: activeTab === 'general' }"
          >
            General
          </button>
        </li>
        <li class="nav-item" role="presentation" @click="activeTab = 'books'">
          <button
            class="nav-link"
            id="books-tab"
            data-bs-toggle="#books-tab-pane"
            data-bs-target="tab"
            type="button"
            role="tab"
            aria-controls="books-tab-pane"
            aria-selected="true"
            :class="{ active: activeTab === 'books' }"
          >
            Books
          </button>
        </li>
        <li
          class="nav-item"
          role="presentation"
          @click="activeTab = 'comments'"
        >
          <button
            class="nav-link"
            id="comments-tab"
            data-bs-toggle="#comments-tab-pane"
            data-bs-target="tab"
            type="button"
            role="tab"
            aria-controls="comments-tab-pane"
            aria-selected="true"
            :class="{ active: activeTab === 'comments' }"
          >
            Comments
          </button>
        </li>
      </ul>
      <div class="tab-content py-4" id="dashboardContent">
        <div
          class="tab-pane fade"
          :class="{ 'active show': activeTab === 'general' }"
          id="general-tab-pane"
          role="tabpanel"
          aria-labelledby="general-tab"
          tabindex="0"
        >
          <DashboardGeneral />
        </div>
        <div
          class="tab-pane fade"
          :class="{ 'active show': activeTab === 'books' }"
          id="books-tab-pane"
          role="tabpanel"
          aria-labelledby="books-tab"
          tabindex="0"
        >
          <DashboardBooks />
        </div>
        <div
          class="tab-pane fade"
          :class="{ 'active show': activeTab === 'comments' }"
          id="comments-tab-pane"
          role="tabpanel"
          aria-labelledby="comments-tab"
          tabindex="0"
        >
          <DashboardComments />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import DashboardBooks from "../components/dashboard/DashboardBooks.vue";
import DashboardComments from "../components/dashboard/DashboardComments.vue";
import DashboardGeneral from "../components/dashboard/DashboardGeneral.vue";
export default {
  components: { DashboardGeneral, DashboardBooks, DashboardComments },
  name: "DashboarView",
  data() {
    return {
      activeTab: "comments",
    };
  },
};
</script>
<style scoped>
.nav-link {
  color: var(--secondary-color);
  font-weight: bold;
}
.nav-tabs {
  border-color: var(--secondary-color);
}
.nav-link.active {
  color: var(--primary-color);
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
}
</style>
