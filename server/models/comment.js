const { query } = require("../db");

async function findByParent(parent) {
  const rows = await query(
    "SELECT id AS _id, creator_id, creator_name, parent, content FROM comments WHERE parent = ?",
    [parent]
  );
  return rows;
}

async function create({ creator_id, creator_name, parent, content }) {
  const result = await query(
    "INSERT INTO comments (creator_id, creator_name, parent, content) VALUES (?, ?, ?, ?)",
    [creator_id, creator_name, parent, content]
  );

  const rows = await query(
    "SELECT id AS _id, creator_id, creator_name, parent, content FROM comments WHERE id = ?",
    [result.insertId]
  );
  return rows[0];
}

module.exports = { findByParent, create };