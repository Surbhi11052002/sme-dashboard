const db = require("../db");
const jwt = require("jsonwebtoken");

exports.profile = async (req, res) => {
  const token = req.header("token");
  if (!token) {
    res
      .status(405)
      .send({ error: "Please authenticate user  valid credentials" });
  }
  try {
    const data = jwt.verify(token, process.env.SECRET);
    const id = await data.id;
    const { rows } = await db.query("select * from users where user_id = $1", [
      id,
    ]);
    //console.log(response);

    return res.status(200).json({
      success: true,
      profile: rows,
    });
  } catch (error) {
    console.log(error.message);
  }
};
