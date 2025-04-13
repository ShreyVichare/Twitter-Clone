import { Tweet } from "../models/tweetSchema.js";
import { User } from "../models/userSchema.js";

// Create a new tweet
export const createTweet = async (req, res) => {
  try {
    const { description, image, id } = req.body; // Expect image as a URL string

    // Validation
    if (!description && !image) {
      return res.status(400).json({
        message: "Tweet must have a description or an image.",
        success: false,
      });
    }
    if (!id) {
      return res.status(400).json({
        message: "User ID is required.",
        success: false,
      });
    }

    // Verify user exists
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    // Optional: Validate image URL if provided
    if (image && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/.test(image)) {
      return res.status(400).json({
        message: "Invalid image URL.",
        success: false,
      });
    }

    // Create the tweet
    const tweet = await Tweet.create({
      description: description || "", // Allow empty description if image exists
      userId: id,
      userDetails: user,
      image: image || "", // Use the image URL from the request body
    });

    return res.status(201).json({
      message: "Tweet created successfully.",
      success: true,
      tweet,
    });
  } catch (error) {
    console.error("Error in createTweet:", error);
    return res.status(500).json({
      message: "Server error while creating tweet.",
      success: false,
      error: error.message,
    });
  }
};

// Delete a tweet
export const deleteTweet = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Tweet ID is required.",
        success: false,
      });
    }

    const tweet = await Tweet.findById(id);
    if (!tweet) {
      return res.status(404).json({
        message: "Tweet not found.",
        success: false,
      });
    }

    // Optional: Check if the logged-in user is the owner of the tweet
    // Assumes you have middleware to attach the logged-in user to req.user
    // if (req.user !== tweet.userId.toString()) {
    //   return res.status(403).json({
    //     message: "You are not authorized to delete this tweet.",
    //     success: false,
    //   });
    // }

    await Tweet.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Tweet deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Error in deleteTweet:", error);
    return res.status(500).json({
      message: "Server error while deleting tweet.",
      success: false,
      error: error.message,
    });
  }
};

// Like or dislike a tweet
export const likeOrDislike = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const tweetId = req.params.id;

    if (!loggedInUserId || !tweetId) {
      return res.status(400).json({
        message: "User ID and Tweet ID are required.",
        success: false,
      });
    }

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({
        message: "Tweet not found.",
        success: false,
      });
    }

    if (tweet.like.includes(loggedInUserId)) {
      // Dislike
      await Tweet.findByIdAndUpdate(tweetId, {
        $pull: { like: loggedInUserId },
      });
      return res.status(200).json({
        message: "Tweet disliked successfully.",
        success: true,
      });
    } else {
      // Like
      await Tweet.findByIdAndUpdate(tweetId, {
        $push: { like: loggedInUserId },
      });
      return res.status(200).json({
        message: "Tweet liked successfully.",
        success: true,
      });
    }
  } catch (error) {
    console.error("Error in likeOrDislike:", error);
    return res.status(500).json({
      message: "Server error while liking/disliking tweet.",
      success: false,
      error: error.message,
    });
  }
};

// Get all tweets (user's and following)
export const getAllTweet = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        message: "User ID is required.",
        success: false,
      });
    }

    const loggedInUser = await User.findById(id);
    if (!loggedInUser) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    const loggedInUserTweets = await Tweet.find({ userId: id });
    const followingUserTweets = await Promise.all(
      loggedInUser.following.map((otherUsersId) => {
        return Tweet.find({ userId: otherUsersId });
      })
    );

    const tweets = loggedInUserTweets.concat(...followingUserTweets);

    return res.status(200).json({
      tweets,
      success: true,
    });
  } catch (error) {
    console.error("Error in getAllTweet:", error);
    return res.status(500).json({
      message: "Server error while fetching tweets.",
      success: false,
      error: error.message,
    });
  }
};

// Get tweets from following users
export const getFollowingTweets = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        message: "User ID is required.",
        success: false,
      });
    }

    const loggedInUser = await User.findById(id);
    if (!loggedInUser) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    const followingUserTweets = await Promise.all(
      loggedInUser.following.map((otherUsersId) => {
        return Tweet.find({ userId: otherUsersId });
      })
    );

    const tweets = [].concat(...followingUserTweets);

    return res.status(200).json({
      tweets,
      success: true,
    });
  } catch (error) {
    console.error("Error in getFollowingTweets:", error);
    return res.status(500).json({
      message: "Server error while fetching following tweets.",
      success: false,
      error: error.message,
    });
  }
};

// Get user's own tweets
export const getOwnTweets = async (req, res) => {
  try {
    const loggedInUserId = req.user._id; // Assuming you have middleware to attach the logged-in user to req.user

    if (!loggedInUserId) {
      return res.status(400).json({
        message: "Logged-in user ID is required.",
        success: false,
      });
    }

    // Fetch tweets created by the logged-in user
    const userTweets = await Tweet.find({ userId: loggedInUserId }).sort({
      createdAt: -1,
    });

    if (!userTweets || userTweets.length === 0) {
      return res.status(404).json({
        message: "No tweets found for this user.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User's tweets fetched successfully.",
      success: true,
      tweets: userTweets,
    });
  } catch (error) {
    console.error("Error in getOwnTweets:", error);
    return res.status(500).json({
      message: "Server error while fetching user's tweets.",
      success: false,
      error: error.message,
    });
  }
};
