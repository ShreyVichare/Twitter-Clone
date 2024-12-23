import express from "express";
import {
  createTweet,
  deleteTweet,
  getAllTweet,
  likeOrDislike,
} from "../controllers/tweetController.js";
import isAuthenticated from "../config/auth.js";
const router = express.Router();

router.route("/create").post(isAuthenticated, createTweet);
router.route("/delete/:id").delete(isAuthenticated, deleteTweet);
router.route("/likeordislike/:id").put(isAuthenticated, likeOrDislike);
router.route("/alltweet/:id").get(isAuthenticated, getAllTweet);
export default router;
