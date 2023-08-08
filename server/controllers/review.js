const db = require("../db");

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
