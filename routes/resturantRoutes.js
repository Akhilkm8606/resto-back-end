const express = require("express");
const { addResturant, getResturant } = require("../controller/resturantControllers");
const { verifyToken } = require("../middleware/auth");
const upload = require("../middleware/fileuplod")
const router =express.Router();


router.route("/resturant").post(verifyToken, upload.single("photograhs"),addResturant);
router.route("/resturants").get(getResturant)
module.exports = router;
