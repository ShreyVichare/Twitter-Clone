import express from "express";
import {
  bookmark,
  follow,
  getMyProfile,
  getOtherUsers,
  Login,
  Logout,
  Register,
  unfollow,
  updateProfile,
} from "../controllers/userController.js";
import isAuthenticated from "../config/auth.js";
const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);
router.route("/bookmark/:id").put(isAuthenticated, bookmark);
router.route("/profile/:id").get(isAuthenticated, getMyProfile);
router.route("/otherusers/:id").get(isAuthenticated, getOtherUsers);
router.route("/follow/:id").post(isAuthenticated, follow);
router.route("/unfollow/:id").post(isAuthenticated, unfollow);
router.route("/profile/update/:id").put(isAuthenticated, updateProfile); // Assuming you want to update the profile with the same route
export default router;
