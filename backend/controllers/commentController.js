import Comment from "../models/Comment.js";

const createAComment = async (req, res) => {
  try {
    const { bookId, content, userId } = req.body;
    const newComment = await Comment.create({
      content: content,
      book: bookId,
      postedBy: userId,
    });
    res
      .status(201)
      .json({ message: "Comment created succesfully", comment: newComment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};
const getCommentsForBook = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.find({ book: id }).populate("postedBy");
    res.status(201).json({ message: "Comments fetched succesfully", comments });
  } catch (error) {
    console.log("serveerrr getCommentsForBook", error);
    res.status(500).json({ error: "internal server error" });
  }
};
const getCommentsByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.find({ postedBy: id }).populate("book");
    res.status(201).json({ message: "Comments fetched succesfully", comments });
  } catch (error) {
    console.log("serveerrr getCommentsByUser ", error);
    res.status(500).json({ error: "internal server error" });
  }
};
export { createAComment, getCommentsForBook, getCommentsByUser };
