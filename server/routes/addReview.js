const { Router } = require("express");
const { review, showReview } = require("../controllers/review");
const router = Router();

router.post("/add-review/:id", review);
router.get("/show-review", showReview);
module.exports = router;
