import { defineStore } from "pinia";
import axios from "axios";
export const useBookStore = defineStore("bookStore", {
  state: () => ({
    books: [],
    isLoading: false,
    userUploadedBooks: [],
  }),

  getters: {
    selectedBook: (state) => {
      return (id) => state.books.find((book) => book._id === id);
    },
  },
  actions: {
    async fetchBooks() {
      this.isLoading = true;
      try {
        const response = await axios.get("http://localhost:3000/api/v1/books");
        this.books = response.data;
      } catch (error) {
        console.error("error at fetching books", error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchBooksByUploader() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/books/uploader"
        );

        this.userUploadedBooks = response.data;
      } catch (error) {
        console.error("Error at user uploaded books", error);
      }
    },
    async addNewBook(newBook) {
      console.log("store new book", newBook);
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/books",
          newBook
        );
        this.books.push(response.data.book);
      } catch (error) {
        throw error.response.data;
      }
    },
    async deleteTheBook(bookId) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/v1/books/${bookId}`
        );
        this.books = this.books.filter((book) => book._id !== bookId);
      } catch (error) {
        throw error.response.data;
      }
    },
    async editTheBook(bookId, bookData) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/v1/books/${bookId}`,
          bookData
        );
        const updatedBookData = response.data.updatedBook;
        const bookIndex = this.books.findIndex((book) => book._id === bookId);
        if (bookIndex !== -1) {
          this.books[bookIndex] = updatedBookData;
        }
      } catch (error) {}
    },
  },
});
