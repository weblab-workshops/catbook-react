const { query } = require("../db");

async function findAll() {
  const rows = await query(
    "SELECT id AS _id, creator_id, creator_name, content FROM stories"
  );
  return rows;
}

async function create({ creator_id, creator_name, content }) {
  console.log("Story.create called with:", { creator_id, creator_name, content });
  const result = await query(
    "INSERT INTO stories (creator_id, creator_name, content) VALUES (?, ?, ?)",
    [creator_id, creator_name, content]
  );
  console.log("Insert result:", result);

  const rows = await query(
    "SELECT id AS _id, creator_id, creator_name, content FROM stories WHERE id = ?",
    [result.insertId]
  );
  console.log("Retrieved story:", rows[0]);
  return rows[0];
}

module.exports = { findAll, create };