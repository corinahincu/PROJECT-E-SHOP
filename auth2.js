// auth.js
const { v4: uuidv4 } = require("uuid");

async function signIn(email, password, fastify) {
  const pool = fastify.pgPool;
  try {
    // Check if a client with the given email and password exists
    const { rows } = await pool.query(
      "SELECT id FROM clients WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (rows.length === 0) {
      return null; // User not found
    }

    // Generate a session_id using a UUID library (e.g., uuidv4)
    const session_id = uuidv4();
    const client_id = rows[0].id // to get the client's id

    // Insert a new session record in client_sessions
    await pool.query(
      "INSERT INTO client_sessions (session_id, client_id) VALUES ($1, $2)",
      [session_id, client_id]
    );

    return {session_id, client_id};
  } catch (error) {
    throw error;
  }
}

async function signOut(session_id, fastify) {
  const pool = fastify.pgPool;
  try {
    // Delete the session record based on session_id
    await pool.query("DELETE FROM client_sessions WHERE session_id = $1", [
      session_id
    ]);
  } catch (error) {
    throw error;
  }
}

module.exports = { signIn, signOut };
