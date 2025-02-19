import { defineStore } from "pinia";
import axios from "axios";

export const useCommentStore = defineStore("commentStore", {
  state: () => ({
    comments: [],
    commentsForBook: [],
    commentsByUser: [],
  }),
  actions: {
    async fetchCommentsForBook(bookId) {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/comments/book/" + bookId
        );
        this.commentsForBook = response.data.comments;
      } catch (error) {
        console.log(error);
      }
    },
    async addNewComment(newComment) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/comments",
          newComment
        );
        this.comments.push(response.data.comment);
      } catch (error) {}
    },
    async fetchCommentsByUser(userId) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/comments/user/${userId}`
        );

        this.commentsByUser = response.data.comments;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
