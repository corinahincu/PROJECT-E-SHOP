const fastify = require("fastify")({
  logger: true,
});

fastify.register(require("@fastify/postgres"), {
  connectionString: "postgres://postgres:1234cc@127.0.0.1:5432/js_shop",
});

const routes = require("./routes"); 
routes(fastify);

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening at ${address}`);
});
