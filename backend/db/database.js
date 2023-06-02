const { Pool } = require("pg");

const pg_pool = new Pool({
  user: "recetas",
  host: "recetas.pg",
  database: "recetas",
  password: "1234",
  port: 5432,
});

module.exports = {
  pg_pool,
};
