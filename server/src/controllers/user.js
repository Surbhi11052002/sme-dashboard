const db = require("../db");

exports.fetchData = async (req, res) => {
  try {
    console.log(req.params.id);
    //grading count
    const gradingCountDaily = await db.query(
      "select daily_count from grading where user_id =$1",
      [req.params.id]
    );
    const gradingCountWeekly = await db.query(
      "select weekly_count from grading where user_id =$1",
      [req.params.id]
    );

    //thinkChat
    const ticketsSolvedDaily = await db.query(
      "select daily from thinkchat where user_id =$1",
      [req.params.id]
    );
    const ticketsSolvedWeekly = await db.query(
      "select weekly from thinkchat where user_id =$1",
      [req.params.id]
    );

    //thinkChat Satisfaction score
    const satisfactionScoreCurrentWeek = await db.query(
      "select satisfaction_score_current_week from thinkchat where user_id =$1",
      [req.params.id]
    );
    const satisfactionScorePastWeek = await db.query(
      "select satisfaction_score_past_week from thinkchat where user_id =$1",
      [req.params.id]
    );

    res.status(200).json({
      status: "succes",
      data: {
        gradingCountDaily: gradingCountDaily.rows[0],
        gradingCountWeekly: gradingCountWeekly.rows[0],
        ticketsSolvedDaily: ticketsSolvedDaily.rows[0],
        ticketsSolvedWeekly: ticketsSolvedWeekly.rows[0],
        satisfactionScoreCurrentWeek: satisfactionScoreCurrentWeek.rows[0],
        satisfactionScorePastWeek: satisfactionScorePastWeek.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
};
