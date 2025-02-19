<template>
  <div class="container">
    <SectionHeader :title="book.title" :text="book.author" />
    <div class="d-flex">
      <font-awesome-icon
        icon="arrow-left"
        size="xl"
        class="mb-2"
        style="cursor: pointer; color: var(--secondary-color)"
        @click="goToBackBooks"
      />
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="image-box">
          <img class="img-fluid" src="../../template/images/b_detail.jpg" />
        </div>
      </div>
      <div class="col-md-6">
        <div class="d-flex flex-column h-100 justify-content-between">
          <div class="mb-3">
            <p>
              {{ book.description }}
            </p>
          </div>
          <div class="d-flex flex-column">
            <div class="row border-bottom pb-2">
              <div class="col-lg-6"><strong>Page</strong></div>
              <div class="col-lg-6">{{ book.pageNumber }}</div>
            </div>
            <div class="row border-bottom pb-2">
              <div class="col-lg-6"><strong>Rating</strong></div>
              <div class="col-lg-6">8.2 - (23 rates)</div>
            </div>
            <div class="row border-bottom pb-2">
              <div class="col-lg-6"><strong>Upload Date</strong></div>
              <div class="col-lg-6">{{ book.updatedAt }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-6">
        <div class="box">
          <h3 style="color: var(--primary-color)">Rate The Book</h3>
          <form>
            <!-- Rating Input -->
            <div class="mb-3">
              <input
                type="number"
                id="rating"
                class="form-control w-50"
                min="1"
                max="10"
                placeholder="Rate (1-10)"
                required
              />
            </div>

            <!-- Submit Button -->
            <button type="submit" class="btn btn-primary">Rate</button>
          </form>
        </div>
      </div>
    </div>
    <hr />
    <div class="row mt-3">
      <div class="col-md-12">
        <div class="box" v-if="isLoggedIn">
          <h3 style="color: var(--primary-color)">Comment The Book</h3>
          <form @submit.prevent="addComment">
            <!-- Comment Text Area -->
            <div class="mb-3">
              <textarea
                id="comment"
                class="form-control"
                rows="4"
                placeholder="Enter your comment"
                required
                v-model="commentContent"
              ></textarea>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="btn btn-primary">Comment</button>
          </form>
        </div>
        <div class="box" v-else>
          <router-link>
            <p>Log in to leave a comment</p>
          </router-link>
        </div>
      </div>
    </div>
    <hr />
    <div class="row my-3">
      <div class="col-md-12">
        <div class="box">
          <h3 style="color: var(--primary-color)">Comments</h3>
          <div>
            <div
              v-for="comment in commentsForBook"
              :key="comment._id"
              class="card mb-4"
            >
              <div class="card-body">
                <p>
                  {{ comment.content }}
                </p>

                <div class="d-flex justify-content-between">
                  <div class="d-flex flex-row align-items-center">
                    <p class="small mb-0 ms-2">
                      {{ comment.postedBy.username }}
                    </p>
                  </div>
                  <div
                    class="d-flex flex-row align-items-center"
                    style="gap: 10px"
                  >
                    <p class="small text-muted mb-0">Upvote?</p>
                    <font-awesome-icon :icon="['far', 'thumbs-up']" />
                    <p class="small text-muted mb-0">3</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionHeader from "../components/SectionHeader.vue";
import { useBookStore } from "../stores/bookStore.js";
import { useAuthStore } from "../stores/authStore.js";
import { useCommentStore } from "../stores/commentStore.js";

import { mapState, mapActions } from "pinia";
export default {
  name: "BookDetailView",
  components: {
    SectionHeader,
  },
  data() {
    return {
      book: null,
      loading: true,
      commentContent: "",
    };
  },
  created() {
    this.selectBook();
    this.fetchCommentsForBook(this.$route.params.id);
  },
  methods: {
    ...mapActions(useCommentStore, ["addNewComment"]),
    ...mapActions(useCommentStore, ["fetchCommentsForBook"]),

    async addComment() {
      try {
        const bookId = this.$route.params.id;
        const content = this.commentContent;
        const userId = this.user._id;

        await this.addNewComment({
          bookId,
          content,
          userId,
        });
        this.commentContent = "";
        await this.fetchCommentsForBook(this.$route.params.id);
      } catch (error) {
        console.log(error);
      }
    },
    goToBackBooks() {
      this.$router.push({ name: "books" });
    },
    selectBook() {
      const bookId = this.$route.params.id;
      this.book = this.selectedBook(bookId);
      this.loading = false;
    },
  },
  computed: {
    ...mapState(useBookStore, ["selectedBook"]),
    ...mapState(useAuthStore, ["user", "isLoggedIn"]),
    ...mapState(useCommentStore, ["commentsForBook"]),
  },
};
</script>

<style scoped>
.image-box {
  height: 300px;
  overflow: hidden;
}
.image-box img {
  width: 100% !important;
}

.btn-primary {
  height: 36px;
  min-width: 120px;
  border-radius: 16px;
}
.box {
  border: 1px solid #e2e3e5;
  border-radius: 10px;
  padding: 20px;
}
</style>
