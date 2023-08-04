const { Router } = require("express");
const { profile } = require("../controllers/profile");

const router = Router();

router.get("/profile/", profile); //default daily data

module.exports = router;
