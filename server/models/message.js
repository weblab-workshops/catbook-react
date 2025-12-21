const { query } = require("../db");

async function find(filter) {
  let sql;
  let params;

  if (filter["recipient._id"]) {
    // ALL_CHAT case
    sql = `
      SELECT
        id AS _id,
        sender_id AS 'sender._id',
        sender_name AS 'sender.name',
        recipient_id AS 'recipient._id',
        recipient_name AS 'recipient.name',
        timestamp,
        content
      FROM messages
      WHERE recipient_id = ?
      ORDER BY timestamp
    `;
    params = [filter["recipient._id"]];
  } else if (filter.$or) {
    // Direct message case: from me->you OR you->me
    const [cond1, cond2] = filter.$or;
    sql = `
      SELECT
        id AS _id,
        sender_id AS 'sender._id',
        sender_name AS 'sender.name',
        recipient_id AS 'recipient._id',
        recipient_name AS 'recipient.name',
        timestamp,
        content
      FROM messages
      WHERE (sender_id = ? AND recipient_id = ?)
         OR (sender_id = ? AND recipient_id = ?)
      ORDER BY timestamp
    `;
    params = [
      cond1["sender._id"],
      cond1["recipient._id"],
      cond2["sender._id"],
      cond2["recipient._id"],
    ];
  } else {
    return [];
  }

  const rows = await query(sql, params);

  // Transform flat results back into nested structure
  return rows.map((row) => ({
    _id: row._id,
    sender: {
      _id: row["sender._id"],
      name: row["sender.name"],
    },
    recipient: {
      _id: row["recipient._id"],
      name: row["recipient.name"],
    },
    timestamp: row.timestamp,
    content: row.content,
  }));
}

async function create({ sender, recipient, content }) {
  const result = await query(
    `INSERT INTO messages (sender_id, sender_name, recipient_id, recipient_name, content, timestamp)
     VALUES (?, ?, ?, ?, ?, NOW())`,
    [sender._id, sender.name, String(recipient._id), recipient.name, content]
  );

  const rows = await query(
    `SELECT
      id AS _id,
      sender_id AS 'sender._id',
      sender_name AS 'sender.name',
      recipient_id AS 'recipient._id',
      recipient_name AS 'recipient.name',
      timestamp,
      content
    FROM messages WHERE id = ?`,
    [result.insertId]
  );

  const row = rows[0];
  return {
    _id: row._id,
    sender: {
      _id: row["sender._id"],
      name: row["sender.name"],
    },
    recipient: {
      _id: row["recipient._id"],
      name: row["recipient.name"],
    },
    timestamp: row.timestamp,
    content: row.content,
  };
}

module.exports = { find, create };