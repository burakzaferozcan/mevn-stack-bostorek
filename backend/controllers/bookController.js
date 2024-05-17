import Book from "../models/Book.js";
import {
  isValidObjectId,
  findDocumentById,
  checkValidationErrors,
} from "../utils/index.js";

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};
const getABook = async (req, res) => {
  const { id } = req.params;
  if (isValidObjectId(id, res)) return;

  try {
    const book = await findDocumentById(Book, id, res);
    if (!book) return;
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const createABook = async (req, res) => {
  try {
    const { title, author, description, pageNumber } = req.body;
    const uploader = req.user._id;
    const existingBook = await Book.findOne({ title, author });
    if (existingBook) {
      return res.status(400).json({ error: "book already exists" });
    }
    const newBook = await Book.create({
      title,
      author,
      description,
      pageNumber,
      uploader,
    });
    return res
      .status(201)
      .json({ message: "book created succesfully", book: newBook });
  } catch (error) {
    if (error.name === "ValidationError") {
      if (checkValidationErrors(error, res)) return;
    } else {
      console.error("error at creating book ", error);
      return res.status(500).json({ error: "internal server error" });
    }
  }
};
const updateABook = async (req, res) => {
  const { id } = req.params;
  const { title, author, description, pageNumber } = req.body;
  if (isValidObjectId(id, res)) return;
  try {
    const book = await findDocumentById(Book, id, res);
    if (!book) return;
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, description, pageNumber },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "the book updated succesfully", updatedBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};
const deleteABook = async (req, res) => {
  console.log("req.user", req.user);
  const { id } = req.params;
  if (isValidObjectId(id, res)) return;
  try {
    const book = await findDocumentById(Book, id, res);
    if (!book) return;
    await book.deleteOne();
    res.status(200).json({ message: "the book deleted succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};
const getBooksByUploader = async (req, res) => {
  try {
    const uploaderId = req.user._id;

    const books = await Book.find({ uploader: uploaderId });
    res.status(200).json(books);
  } catch (error) {
    console.error("Error at getBooksByUploader", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};
export {
  getAllBooks,
  createABook,
  getABook,
  updateABook,
  deleteABook,
  getBooksByUploader,
};
