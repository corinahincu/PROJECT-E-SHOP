
const { v4: uuidv4 } = require("uuid");
//signin
async function signIn(email, password, fastify) {
  const pool = fastify.pgPool;
  try {
    const { rows } = await pool.query(
      "SELECT id FROM clients WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (rows.length === 0) {
      return null; 
    }

    const session_id = uuidv4();
    const client_id = rows[0].id 

    await pool.query(
      "INSERT INTO client_sessions (session_id, client_id) VALUES ($1, $2)",
      [session_id, client_id]
    );

    return {session_id, client_id};
  } catch (error) {
    throw error;
  }
}
//signout
async function signOut(session_id, fastify) {
  const pool = fastify.pgPool;
  try {
    await pool.query("DELETE FROM client_sessions WHERE session_id = $1", [
      session_id
    ]);
  } catch (error) {
    throw error;
  }
}

module.exports = { signIn, signOut };
