
module.exports = function (fastify, pool) {
  // GET /clients
  fastify.get("/clients", async (req, reply) => {
    try {
      const { rows } = await pool.query("SELECT id, name FROM clients;");
      console.log(rows);
      reply.send(rows);
    } catch (error) {
      console.error("Error", error);
      reply.status(500).send("Internal Server Error");
    }
  });

  fastify.get("/clients/:id", {
  preHandler: async (request, reply) => {
    const clientId = request.params.id;
    const session_id = request.query.session_id;
    
    if (!session_id) {
      const clientQueryResult = await pool.query(
        "SELECT id, name FROM clients WHERE id = $1",
        [clientId]
      );

      if (clientQueryResult.rows.length === 0) {
        reply.code(404).send("Client not found");
      } else {
        const clientData = clientQueryResult.rows[0];
        reply.send(clientData);
      }
    } 
  },
  handler: async (request, reply) => {
    const clientId = request.params.id;
    const session_id = request.query.session_id;

    if (session_id) {
      try {
        const { rows } = await pool.query(
          "SELECT client_id FROM client_sessions WHERE session_id = $1",
          [session_id]
        );

        if (rows.length === 0 || rows[0].client_id !== clientId) {
          reply
            .code(401)
            .send({ status: "error", message: "Not authorized" });
          return;
        }
      } catch (error) {
        console.error("Error", error);
        reply.status(500).send("Internal Server Error");
        return;
      }

      const clientQueryResult = await pool.query(
        "SELECT * FROM clients WHERE id = $1",
        [clientId]
      );

      if (clientQueryResult.rows.length === 0) {
        reply.code(404).send("Client not found");
      } else {
        const clientData = clientQueryResult.rows[0];
        reply.send(clientData);
      }
    }
  },
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

  // PATCH / clients
  fastify.patch("/clients/:id", {
    preHandler: async (request, reply) => {
      const clientId = request.params.id;
      const session_id = request.query.session_id;

      if (session_id) {
        try {
          const { rows } = await pool.query(
            "SELECT client_id FROM client_sessions WHERE session_id = $1",
            [session_id]
          );

          if (rows.length === 0 || rows[0].client_id !== clientId) {
            reply
              .code(401)
              .send({ status: "error", message: "Not authorized" });
            return;
          }
        } catch (error) {
          console.error("Error", error);
          reply.status(500).send("Internal Server Error");
          return;
        }
      }
    },
    handler: async (request, reply) => {
      const clientId = request.params.id;
      const updatedClientData = request.body;

      try {
        const { rows: clientQueryResult } = await pool.query(
          "SELECT * FROM clients WHERE id = $1",
          [clientId]
        );

        if (clientQueryResult.length === 0) {
          reply.code(404).send("Client not found");
          return;
        }

        const { rows } = await pool.query(
          `
        UPDATE clients
        SET
          name = $1,
          address = $2,
          phone = $3,
          email = $4,
          password = $5
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

        if (rows.length === 0) {
          reply.status(500).send("Failed to update client data");
          return;
        }

        reply.send(rows[0]);
      } catch (error) {
        console.error("Error", error);
        reply.status(500).send("Internal Server Error");
        return;
      }
    },
  });

  // DELETE /clients/:id
fastify.delete(
  "/clients/:id",
  {
    preHandler: async (request, reply) => {
      const clientId = request.params.id;
      const session_id = request.query.session_id;

      if (session_id) {
        try {
          const { rows } = await pool.query(
            "SELECT client_id FROM client_sessions WHERE session_id = $1",
            [session_id]
          );
          
          if (rows.length === 0 || rows[0].client_id !== clientId) {
            reply.code(401).send({ status: "error", message: "Not authorized" });
            return;
          }
        } catch (error) {
          console.error("Error", error);
          reply.status(500).send("Internal Server Error");
          return;
        }
      }
    },
    handler: async (req, reply) => {
      const clientId = req.params.id;

      try {
        const { rows } = await pool.query(
          "DELETE FROM clients WHERE id = $1 RETURNING *",
          [clientId]
        );
        reply.send(rows[0]);
      } catch (error) {
        console.error("Error", error);
        reply.status(500).send("Internal Server Error");
      }
    },
  }
);
}
