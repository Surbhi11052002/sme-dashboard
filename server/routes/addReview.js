const { Router } = require("express");
const { review } = require("../controllers/review");
const router = Router();

router.post("/add-review/:id", review);
module.exports = router;
