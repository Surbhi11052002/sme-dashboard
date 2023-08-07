const { Router } = require("express");
const {
  fetchData,
  fetchTotalData,
  fetchSpecificDateData,
} = require("../controllers/user");

const router = Router();

router.get("/get-users/:id", fetchData); //default daily data
router.get("/get-users/:id/:start_date", fetchSpecificDateData); // specific date
router.get("/get-users/:id/:start_date/:end_date", fetchTotalData); // start and end date

module.exports = router;
