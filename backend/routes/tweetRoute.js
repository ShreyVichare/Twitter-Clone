import express from "express";
import {
  createTweet,
  deleteTweet,
  getAllTweet,
  likeOrDislike,
  getFollowingTweets,
} from "../controllers/tweetController.js";
import {} from "../controllers/tweetController.js";

import isAuthenticated from "../config/auth.js";
const router = express.Router();

router.route("/create").post(isAuthenticated, createTweet);
router.route("/delete/:id").delete(isAuthenticated, deleteTweet);
router.route("/likeordislike/:id").put(isAuthenticated, likeOrDislike);
router.route("/alltweet/:id").get(isAuthenticated, getAllTweet);
router.route("/followingtweet/:id").get(isAuthenticated, getFollowingTweets);

export default router;
