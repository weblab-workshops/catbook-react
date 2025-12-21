const { query } = require("../db");

// Matches old call style: User.findOne({ googleid: ... })
async function findOne(filter) {
  if (!filter || !filter.googleid) return null;

  const rows = await query(
    "SELECT id AS _id, name, google_id AS googleid FROM users WHERE google_id = ?",
    [filter.googleid]
  );
  return rows[0] || null;
}

async function create({ name, googleid }) {
  await query(
    "INSERT INTO users (google_id, name) VALUES (?, ?)",
    [googleid, name]
  );
  return findOne({ googleid });
}

async function findById(id) {
  const rows = await query(
    "SELECT id AS _id, name, google_id AS googleid FROM users WHERE id = ?",
    [id]
  );
  return rows[0] || null;
}

module.exports = { findOne, create, findById };
