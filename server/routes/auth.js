const router = require("express").Router();
const {
  getUsers,
  register,
  login,
  protected,
  logout,
} = require("../controllers/auth");
const { registerValidation, loginValidation } = require("../validators/auth");
const {
  validationMiddleware,
} = require("../middlewares/validations-middleware");
const { userAuth } = require("../middlewares/auth-middleware");

router.get("/get-users", getUsers);
router.get("/protected", userAuth, protected);
//router.post("/register", registerValidation, validationMiddleware, register);
router.post('/register',  (req, res) => {
  console.log("tushar----",  req.body);

  res.status(202)

  return res.json({
    'msg': "ok"
  })
})
router.post("/login", loginValidation, validationMiddleware, login);
router.post("/logout", userAuth, logout);


module.exports = router;
