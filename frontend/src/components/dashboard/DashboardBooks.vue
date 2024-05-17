<template>
  <!-- Button -->
  <div class="row mb-3">
    <div class="col text-end">
      <button type="button" class="btn btn-primary" @click="openAddModal()">
        Add Book
      </button>
    </div>
  </div>
  <!-- Table -->
  <div class="row">
    <div class="col">
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Description</th>
            <th>Page</th>
            <th class="text-center">Edit</th>
            <th class="text-center">Delete</th>
          </tr>
        </thead>
        <transition-group name="list" tag="tbody">
          <tr v-for="book in paginatedBooks" :key="book._id">
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td style="max-width: 250px">
              {{ book.description }}
            </td>
            <td>{{ book.pageNumber }}</td>
            <td class="text-center">
              <font-awesome-icon
                :icon="['far', 'pen-to-square']"
                class="text-warning"
                style="cursor: pointer"
                @click="openEditModal(book)"
              />
            </td>
            <td class="text-center">
              <font-awesome-icon
                :icon="['fas', 'trash']"
                class="text-danger"
                style="cursor: pointer"
                @click="deleteBook(book._id, book.title)"
              />
            </td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
  <div class="row">
    <PaginationWidget
      :currentPage="currentPage"
      :totalPages="totalPages"
      @page-changed="updatePage"
    />
  </div>
  <!-- Modal -->
  <div class="modal fade" ref="addEditModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addModalLabel">{{ modalTitle }}</h5>
          <button
            type="button"
            @click="modal.hide()"
            class="btn-close"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body mx-5">
          <div class="col mb-3">
            <label for="title" class="form-label"
              >Title
              <span class="text-danger">*</span>
            </label>
            <input
              type="text"
              class="form-control"
              id="title"
              name="title"
              required
              v-model="bookData.title"
            />
          </div>
          <div class="col mb-3">
            <label for="author" class="form-label"
              >Author
              <span class="text-danger">*</span>
            </label>
            <input
              type="text"
              class="form-control"
              id="author"
              name="author"
              required
              v-model="bookData.author"
            />
          </div>
          <div class="col mb-3">
            <label for="description" class="form-label"
              >Description
              <span class="text-danger">*</span>
            </label>
            <textarea
              name="description"
              id="description"
              class="form-control"
              cols="30"
              rows="5"
              v-model="bookData.description"
            ></textarea>
          </div>
          <div class="col mb-3">
            <label for="author" class="form-label"
              >Number of Pages
              <span class="text-danger">*</span>
            </label>
            <input
              type="number"
              class="form-control"
              id="numOfPages"
              name="numOfPages"
              required
              v-model="bookData.pageNumber"
            />
          </div>
          <div class="text-end mb-4">
            <button
              type="button"
              @click="modal.hide()"
              class="btn btn-outline-secondary"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="saveBook">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import { useBookStore } from "../../stores/bookStore";
import { mapActions, mapState } from "pinia";
import { useToast } from "vue-toastification";
import PaginationWidget from "../widgets/PaginationWidget.vue";

export default {
  components: { PaginationWidget },
  name: "DashboardBooks",
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 4,
      modal: null,
      modalTitle: "",
      bookData: {
        title: "",
        author: "",
        description: "",
        pageNumber: null,
        editedBookId: null,
      },
    };
  },
  created() {
    this.fetchBooksByUploader();
  },
  computed: {
    ...mapState(useBookStore, ["userUploadedBooks"]),
    totalPages() {
      return Math.ceil(this.userBooks.length / this.itemsPerPage);
    },
    paginatedBooks() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.userBooks.slice(startIndex, endIndex);
    },
    userBooks() {
      return this.userUploadedBooks
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.addEditModal);
  },
  methods: {
    ...mapActions(useBookStore, [
      "addNewBook",
      "fetchBooksByUploader",
      "deleteTheBook",
      "editTheBook",
    ]),
    updatePage(page) {
      this.currentPage = page;
    },
    saveBook() {
      if (this.modalTitle === "Add Book") {
        this.addBook();
      } else if (this.modalTitle === "Edit Book") {
        this.editBook();
      }
      this.modal.hide();
      this.fetchBooksByUploader();
    },
    openAddModal() {
      this.modalTitle = "Add Book";
      this.bookData = {
        title: "",
        author: "",
        description: "",
        pageNumber: null,
      };
      this.modal.show();
    },
    openEditModal(existingBook) {
      this.modalTitle = "Edit Book";
      this.editedBookId = existingBook._id;
      this.bookData = { ...existingBook };
      this.modal.show();
    },

    showToast(message, options) {
      const toast = useToast();
      toast(message, {
        position: "top-right",
        closeButton: "button",
        icon: true,
        rtl: false,
        ...options,
      });
    },
    async editBook() {
      try {
        await this.editTheBook(this.editedBookId, this.bookData);
        this.fetchBooksByUploader();
        this.modal.hide();
        this.showToast(`The book edited succesfully`, {
          type: "success",
          timeout: 2000,
        });
      } catch (error) {
        console.error(error);
      }
    },
    async deleteBook(bookId, bookTitle) {
      try {
        await this.deleteTheBook(bookId);

        this.fetchBooksByUploader();

        this.showToast(`${bookTitle} deleted succesfully`, {
          type: "warning",
          timeout: 2000,
        });
      } catch (error) {
        console.error(error);
      }
    },
    async addBook() {
      try {
        await this.addNewBook(this.bookData);
        this.modal.hide();
        this.bookData = {
          title: "",
          author: "",
          description: "",
          pageNumber: null,
        };
        this.fetchBooksByUploader();

        this.showToast(`New book added succesfully`, {
          type: "success",
          timeout: 1000,
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style scoped>
.btn-outline-secondary {
  border-radius: 25px;
  height: 48px;
  margin-right: 20px;
  min-width: 120px;
  margin-bottom: 20px;
}
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-600px);
}
.list-leave-active {
  position: absolute;
}
</style>
