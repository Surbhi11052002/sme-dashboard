const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "user_auth",
  password: "surbhi",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
