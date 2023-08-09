const db = require("../db");
const jwt = require("jsonwebtoken");

exports.review = async (req, res) => {
  const { id } = req.params;
  const { review } = req.body;

  try {
    const updateReviewQuery =
      "UPDATE users SET reviews = $1 WHERE user_id = $2";
    await db.query(updateReviewQuery, [review, id]);

    res.status(200).json({ message: "Review submitted successfully" });
  } catch (error) {
    console.error("Error updating review:", error.message);
    res.status(500).json({ error: "Failed to update review" });
  }
};

exports.showReview = async (req, res) => {
  const token = req.header("token");
  if (!token) {
    res
      .status(405)
      .send({ error: "Please authenticate user  valid credentials" });
  }
  try {
    const data = jwt.verify(token, process.env.SECRET);
    const id = await data.id;
    const { rows } = await db.query(
      "select reviews from users where user_id = $1",
      [id]
    );
    //console.log(response);

    return res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.log(error.message);
  }
};
