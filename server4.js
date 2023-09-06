
const fastify = require("fastify")({
  logger: true,
});

const fs = require("fs");
const { Pool } = require("pg");
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
const dbPool = new Pool({
  connectionString: config.postgresURL, 
});

fastify.register(require("@fastify/postgres"), { pool: dbPool }, (err) => {
  if (err) {
    console.error("PostgreSQL connection error:", err);
  }
});

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
});


fastify.get("/user/:id", function (req, reply) {
  fastify.pg.query(
    "SELECT id, username, hash, salt FROM users WHERE id=$1",
    [req.params.id],
    function onResult(err, result) {
      reply.send(err || result);
    }
  );
});

fastify.get("/", async (req, reply) => {
  const dbConnection = await fastify.pg.connect(); 
  console.log("database connection !!!!!!", dbConnection)
  try {
    const { rows } = await dbConnection.query("SELECT * FROM products");
    reply.send(rows);
  } catch(error){
    console.error("Error !!!!", error);
  } finally {
    dbConnection.release();
    console.log("database connection released !!!!!!",dbConnection)
  }
});

