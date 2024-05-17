import express from "express";
import * as commentController from "../controllers/commentController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();
router.post(
  "/",
  authMiddleware.authenticateUser,
  commentController.createAComment
);
router.get("/book/:id", commentController.getCommentsForBook);
router
  .route("/user/:id")
  .get(authMiddleware.authenticateUser, commentController.getCommentsByUser);
export default router;
