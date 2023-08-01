const db = require("../db");
const jwt = require("jsonwebtoken");

exports.fetchData = async (req, res, next) => {
  const token = req.header("token");
  console.log(token);
  if (!token) {
    res
      .status(401)
      .send({ error: "Please authenticate user  valid credentials" });
  }

  try {
    const data = jwt.verify(token, process.env.SECRET);
    //req.user = data.user;
    //grading count
    const id = await data.id;
    const gradingCountDaily = await db.query(
      "SELECT g.grading_count_daily FROM grading g JOIN users u ON g.user_id = u.user_id WHERE u.user_id = $1 AND submission_date= CURRENT_DATE",
      [id]
    );
    //thinkchat
    const thinkchatCountDaily = await db.query(
      "SELECT t.tickets_solved FROM thinkchat t JOIN users u ON t.user_id = u.user_id WHERE u.user_id = $1 AND submission_date= CURRENT_DATE",
      [id]
    );
    //satisfaction score
    const satisfactionScoreDaily = await db.query(
      "SELECT ROUND(t.tickets_solved::float / NULLIF(t.tickets_handled, 0) * 100) AS satisfaction_score FROM thinkchat t JOIN users u ON t.user_id = u.user_id WHERE u.user_id = $1 AND submission_date= CURRENT_DATE",
      [id]
    );

    res.status(200).json({
      status: "succes",
      data: {
        gradingCountDaily: gradingCountDaily.rows[0],
        thinkchatCountDaily: thinkchatCountDaily.rows[0],
        satisfactionScoreDaily: satisfactionScoreDaily.rows[0],
      },
    });
  } catch (error) {
    res
      .status(401)
      .send({ error: "Please authenticate user with valid credentials" });
  }
};

exports.fetchSpecificDateData = async (req, res) => {
  const token = req.header("token");
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate user with valid credentials" });
  }

  try {
    const data = jwt.verify(token, process.env.SECRET);
    const id = data.id;
    const { start_date } = req.params;

    // grading count
    const gradingCount = await db.query(
      "SELECT g.grading_count_daily FROM grading g JOIN users u ON g.user_id = u.user_id WHERE u.user_id = $1 AND g.submission_date = $2",
      [id, start_date]
    );

    // thinkchat
    const thinkchatCount = await db.query(
      "SELECT t.tickets_solved FROM thinkchat t JOIN users u ON t.user_id = u.user_id WHERE u.user_id = $1 AND t.submission_date = $2",
      [id, start_date]
    );

    // satisfaction score
    const satisfactionScore = await db.query(
      "SELECT ROUND(t.tickets_solved::float / NULLIF(t.tickets_handled, 0) * 100) AS satisfaction_score FROM thinkchat t JOIN users u ON t.user_id = u.user_id WHERE u.user_id = $1 AND t.submission_date = $2",
      [id, start_date]
    );

    res.status(200).json({
      status: "success",
      data: {
        gradingCount: gradingCount.rows[0],
        thinkchatCount: thinkchatCount.rows[0],
        satisfactionScore: satisfactionScore.rows[0],
      },
    });
  } catch (error) {
    res
      .status(401)
      .send({ error: "Please authenticate user with valid credentials" });
  }
};

// exports.fetchSpecificDateData = async (req, res) => {
//   try {
//     //grading count
//     const { id, start_date } = req.params;
//     const gradingCount = await db.query(
//       "SELECT g.grading_count_daily FROM grading g JOIN users u ON g.user_id = u.user_id WHERE u.user_id = $1 AND submission_date= $2",
//       [id, start_date]
//     );
//     //thinkchat
//     const thinkchatCount = await db.query(
//       "SELECT t.tickets_solved FROM thinkchat t JOIN users u ON t.user_id = u.user_id WHERE u.user_id = $1 AND submission_date= $2",
//       [id, start_date]
//     );
//     //satisfaction score
//     const satisfactionScore = await db.query(
//       "SELECT (t.tickets_solved::float / NULLIF(t.tickets_handled, 0) * 100) AS satisfaction_score FROM thinkchat t JOIN users u ON t.user_id = u.user_id WHERE u.user_id = $1 AND submission_date= $2",
//       [id, start_date]
//     );
//     res.status(200).json({
//       status: "succes",
//       data: {
//         gradingCount: gradingCount.rows[0],
//         thinkchatCount: thinkchatCount.rows[0],
//         satisfactionScore: satisfactionScore.rows[0],
//       },
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// exports.fetchTotalData = async (req, res) => {
//   try {
//     //grading count
//     const { id, start_date, end_date } = req.params;
//     const totalGradingCount = await db.query(
//       "SELECT SUM(g.grading_count_daily) AS total_grading_count FROM grading g JOIN users u ON g.user_id = u.user_id WHERE u.user_id = $1 AND g.submission_date BETWEEN $2 AND $3",
//       [id, start_date, end_date]
//     );
//     //thinkchat
//     const totalthinkchatCount = await db.query(
//       "SELECT SUM(t.tickets_solved) AS total_thinkchat_count FROM thinkchat t JOIN users u ON t.user_id = u.user_id WHERE u.user_id = $1 AND t.submission_date BETWEEN $2 AND $3",
//       [id, start_date, end_date]
//     );
//     //satisfaction score
//     const toatalsatisfactionScore = await db.query(
//       "SELECT (SUM(t.tickets_solved::float) / NULLIF(SUM(t.tickets_handled), 0) * 100) AS satisfaction_score FROM thinkchat t JOIN users u ON t.user_id = u.user_id WHERE u.user_id = $1 AND submission_date BETWEEN $2 AND $3",
//       [id, start_date, end_date]
//     );

//     res.status(200).json({
//       status: "succes",
//       data: {
//         totalGradingCount: totalGradingCount.rows[0],
//         totalthinkchatCount: totalthinkchatCount.rows[0],
//         toatalsatisfactionScore: toatalsatisfactionScore.rows[0],
//       },
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

exports.fetchTotalData = async (req, res) => {
  const token = req.header("auth-token");
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate user with valid credentials" });
  }

  try {
    const data = jwt.verify(token, process.env.SECRET);
    const id = data.id;
    const { start_date, end_date } = req.params;

    // grading count
    const totalGradingCount = await db.query(
      "SELECT SUM(g.grading_count_daily) AS total_grading_count FROM grading g JOIN users u ON g.user_id = u.user_id WHERE u.user_id = $1 AND g.submission_date BETWEEN $2 AND $3",
      [id, start_date, end_date]
    );

    // thinkchat
    const totalthinkchatCount = await db.query(
      "SELECT SUM(t.tickets_solved) AS total_thinkchat_count FROM thinkchat t JOIN users u ON t.user_id = u.user_id WHERE u.user_id = $1 AND t.submission_date BETWEEN $2 AND $3",
      [id, start_date, end_date]
    );

    // satisfaction score
    const toatalsatisfactionScore = await db.query(
      "SELECT ROUND(SUM(t.tickets_solved::float) / NULLIF(SUM(t.tickets_handled), 0) * 100) AS satisfaction_score FROM thinkchat t JOIN users u ON t.user_id = u.user_id WHERE u.user_id = $1 AND t.submission_date BETWEEN $2 AND $3",
      [id, start_date, end_date]
    );

    res.status(200).json({
      status: "success",
      data: {
        totalGradingCount: totalGradingCount.rows[0].total_grading_count || 0,
        totalthinkchatCount:
          totalthinkchatCount.rows[0].total_thinkchat_count || 0,
        toatalsatisfactionScore:
          toatalsatisfactionScore.rows[0].satisfaction_score || 0,
      },
    });
  } catch (error) {
    res
      .status(401)
      .send({ error: "Please authenticate user with valid credentials" });
  }
};
