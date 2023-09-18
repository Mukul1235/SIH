const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
// const UserProfileSchema = require("../model/UserProfileSchema");
// const otherUserprofile = require("../model/otherUserProfile");
const { User } = require("../model/userModel");

// PROFILE DATA INSERTING IN BACKEND
// router.post('/:userId', async (req, res) => {
//     const userId = req.params.userId;
//     const profile = new UserProfileSchema({
//         UserId: userId,
//         prompt: [req.body.question1, req.body.question2],
//         interest: [req.body.interest1, req.body.interest2],
//         socialprofile: [req.body.socialprofile1, req.body.socialprofile2]
//     });
//     console.log(profile);
//     try {
//         const newProfile = await profile.save();
//         res.status(200).json(newProfile);

//     }
//     catch (err) {
//         console.log(err)
//         res.status(500).json(err);
//     }
// });

// // PROFILE IDS GET FROM BACKEND
// router.get("/:userId", async (req, res) => {
//     const userId = req.params.userId;
//     const x = UserProfileSchema.find((err, value) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.json(value);
//       }
//     });
// });

//   UPDATE USER
router.put("/UpdateUser/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json("err");
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account Has been updated");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account");
  }
});

// DELETE USER
router.delete("/DeleteUser/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account Has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account");
  }
});

// GET USER
router.get("/GetUser/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//FOLLOW A USER
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

//LIKE OR DISLIKE
router.put("/:id/like", async (req, res) => {
  try {
    const post = await User.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The User has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The User has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL USERS
// router.get("/AllUser",async(req,res)=>{
//   const currentUser=await User.findById(req.body.userId);
//   const friend=await Promise.all()
// })

router.get("/AllUser", async (req, res) => {
  const x = User.find((err, value) => {
    if (err) {
      console.log(err);
    } else {
      res.json(value);
    }
  });
});

module.exports = router;
