const { Router } = require("express");
const { fetchData } = require("../controllers/user");

const router = Router();

router.get("/get-users/:id", fetchData);

module.exports = router;
