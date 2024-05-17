<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-end">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <button
          class="page-link"
          aria-label="Previous"
          @click="goToPage(currentPage - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>
      <li
        class="page-item"
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        :class="{ active: currentPage === page }"
      >
        <button class="page-link">{{ page }}</button>
      </li>

      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <button
          class="page-link"
          aria-label="Next"
          @click="goToPage(currentPage + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "PaginationWidget",
  emits: ["page-changed"],
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  methods: {
    goToPage(page) {
      this.$emit("page-changed", page);
    },
  },
};
</script>
