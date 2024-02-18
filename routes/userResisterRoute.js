const express = require("express");
const router =express.Router();
const {postRegister,userLogin, getAllUsers,updateUserDetails, getUserDetails, deletetUser} = require("../controller/userCotrollers");
const { verifyToken } = require("../middleware/auth");
// const { get } = require("../app");



router.route("/registration").post(postRegister);
router.route("/login").post(userLogin);
router.route("/users").get(verifyToken,getAllUsers);
router.route("/users/:id").put(verifyToken,updateUserDetails).get(verifyToken,getUserDetails).delete(verifyToken,deletetUser);

module.exports = router;