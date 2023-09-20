const fastify = require("fastify")({
  logger: true,
});
const {signIn,signOut}= require("./auth2")

  const { Pool } = require("pg");
  const pool = new Pool({
    user: "postgres",
    host: "127.0.0.1",
    database: "js_shop",
    password: "8929c",
    port: 5432,
  });
fastify.decorate("pgPool",pool)
fastify.register(require("@fastify/postgres"), {
  pool: fastify.pgPool,
});

fastify.decorate("testMiddleware", async (request, reply) => {
  console.log("TEST!!!");
  fastify.log.info("TEST!!!");
});

fastify.addHook("preHandler", async (request, reply) => {
  fastify.testMiddleware(request, reply);
});


fastify.post("/auth/signin", async (req, reply) => {
  const { email, password } = req.body;
  const {session_id, client_id } = await signIn(email, password, fastify);

  if (session_id) {
    reply.send({ status: "success", session_id, client_id });
  } else {
    reply
      .status(401)
      .send({ status: "error", message: "Authorization failed" });
  }
});

fastify.post("/auth/signout", async (req, reply) => {
  const  {session_id}  = req.body;
  await signOut(session_id, fastify);

  reply.send({ status: "success" });
});

const routes = require("./routes2");
routes(fastify,pool);

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening at ${address}`);
});
