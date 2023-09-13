
module.exports = function (fastify) {
  const { Pool } = require("pg");
  const pool = new Pool({
    user: "postgres",
    host: "127.0.0.1",
    database: "js_shop",
    password: "8929c",
    port: 5432,
  });

  // GET /clients
  fastify.get("/clients", async (req, reply) => {
    try {
      const { rows } = await pool.query("SELECT * FROM clients;");
      console.log(rows);
      reply.send(rows);
    } catch (error) {
      console.error("Error", error);
      reply.status(500).send("Internal Server Error");
    }
  });

  // GET /clients/:id
  fastify.get("/clients/:id", async (req, reply) => {
    const clientId = req.params.id;
    try {
      const { rows } = await pool.query("SELECT * FROM clients WHERE id = $1", [
        clientId,
      ]);
      if (rows.length === 0) {
        reply.code(404).send("Client not found");
      } else {
        reply.send(rows[0]);
      }
    } catch (error) {
      console.error("Error", error);
      reply.status(500).send("Internal Server Error");
    }
  });

  // products
  fastify.get("/products", async (req, reply) => {

    try {
      const { rows } = await pool.query("SELECT * FROM products;");
      console.log(rows);
      reply.send(rows);
    } catch (error) {
      console.error("Error", error);
      reply.status(500).send("Internal Server Error");
    }
  });

  // POST /clients
  fastify.post("/clients", async (req, reply) => {
    try {
      const newClient = req.body;
      const { rows } = await pool.query(
        `INSERT INTO clients(name,address,phone,email,password) VALUES('${newClient.name}', '${newClient.address}','${newClient.phone}', '${newClient.email}','${newClient.password}') `
      );

      reply.code(201).send(rows[0]);
    } catch (error) {
      console.error("Error", error);
      reply.status(500).send("Internal Server Error");
    }
  });

  // PATCH /clients/:id
  fastify.patch("/clients/:id", async (req, reply) => {
    const clientId = req.params.id;
    const updatedClientData = req.body;

    try {

      const { rows } = await pool.query(
        `
      UPDATE clients
      SET name = $1, address = $2, phone = $3, email = $4, password = $5
      WHERE id = $6
      RETURNING *
      `,
        [
          updatedClientData.name,
          updatedClientData.address,
          updatedClientData.phone,
          updatedClientData.email,
          updatedClientData.password,
          clientId,
        ]
      );

      reply.send(rows[0]);
    } catch (error) {
      console.error("Error", error);
      reply.status(500).send("Internal Server Error");
    }
  });

  // DELETE / clients/:id
  fastify.delete("/clients/:id", async (req, reply) =>{
    const clientId = req.params.id

    try{
      const {rows} = await pool.query(
        "DELETE FROM clients WHERE id = $1 RETURNING *", 
        [clientId]
      )
      reply.send(rows[0])
    } catch{
      console.error("Error", error)
      reply.status(500).send("Internal Server Error")
    }
  })

};
