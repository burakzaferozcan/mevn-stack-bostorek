<template>
  <section>
    <div class="container">
      <SectionHeader
        title="Books"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit."
      ></SectionHeader>
      <BookList :books="paginatedBooks"></BookList>
      <PaginationWidget
        :currentPage="currentPage"
        :totalPages="totalPages"
        @page-changed="updatePage"
      ></PaginationWidget>
    </div>
  </section>
</template>

<script>
import BookList from "../components/BookList.vue";
import PaginationWidget from "../components/widgets/PaginationWidget.vue";
import SectionHeader from "../components/SectionHeader.vue";
import { useBookStore } from "../stores/bookStore.js";
import { mapState } from "pinia";
export default {
  components: { SectionHeader, BookList, PaginationWidget },
  name: "BooksView",
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 8,
    };
  },
  computed: {
    ...mapState(useBookStore, ["books"]),
    totalPages() {
      return Math.ceil(this.books.length / this.itemsPerPage);
    },
    paginatedBooks() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.books.slice(startIndex, endIndex);
    },
  },
  methods: {
    updatePage(page) {
      this.currentPage = page;
    },
  },
};
</script>
<style scope>
.auth-box {
  margin-top: -30px;
}
</style>
