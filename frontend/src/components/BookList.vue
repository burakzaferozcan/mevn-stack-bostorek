<template>
  <div class="row">
    <div
      class="col-sm-6 col-md-4 col-xl-3 mb-4"
      v-for="book in books"
      :key="book.id"
    >
      <router-link :to="`/books/${book._id}`">
        <BookItem :book="book"></BookItem>
      </router-link>
    </div>
  </div>
</template>

<script>
import BookItem from "./BookItem.vue";

export default {
  name: "BookList",
  props: {
    books: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    BookItem,
  },
};
</script>
