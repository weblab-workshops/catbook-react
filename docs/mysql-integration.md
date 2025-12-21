
# Node.js + MySQL Integration

### Setup
```bash
npm install mysql2
```

### Environment Variables (.env)
```env
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=app
MYSQL_PASSWORD=app
MYSQL_DATABASE=my_database
```

### Typical Structure
```markdown
server/
 ├── db.js        ← connection pool
 ├── models/      ← SQL queries
 ├── api.js       ← routes
 └── server.js
```

### Database Connection (db.js)
```javascript
const mysql = require("mysql2/promise");

let pool;

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT || 3306),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

async function query(sql, params = []) {
  const [rows] = await getPool().execute(sql, params);
  return rows;
}

module.exports = { getPool, query };
```

### Model Pattern (models/user.js)
```javascript
const { query } = require("../db");

async function findAll() {
  return await query("SELECT * FROM users");
}

async function findById(id) {
  const rows = await query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0] || null;
}

async function create({ name, email }) {
  const result = await query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email]
  );
  return findById(result.insertId);
}

async function update(id, { name, email }) {
  await query(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    [name, email, id]
  );
  return findById(id);
}

async function remove(id) {
  await query("DELETE FROM users WHERE id = ?", [id]);
}

module.exports = { findAll, findById, create, update, remove };
```

### API Routes (api.js)
```javascript
const express = require("express");
const User = require("./models/user");
const router = express.Router();

// GET all users
router.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});

// GET single user
router.get("/user/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send({ error: "User not found" });
  res.send(user);
});

// POST create user
router.post("/user", async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
  });
  res.send(user);
});

// PUT update user
router.put("/user/:id", async (req, res) => {
  const user = await User.update(req.params.id, {
    name: req.body.name,
    email: req.body.email,
  });
  res.send(user);
});

// DELETE user
router.delete("/user/:id", async (req, res) => {
  await User.remove(req.params.id);
  res.send({ success: true });
});

module.exports = router;
```

### Error Handling
```javascript
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).send({ error: "Internal server error" });
  }
});
```

## Security Best Practices

### Prevent SQL Injection
```javascript
// NEVER DO THIS (vulnerable to SQL injection)
const query = `SELECT * FROM users WHERE email = '${userEmail}'`;

// ✅ ALWAYS USE PARAMETERIZED QUERIES
const rows = await query("SELECT * FROM users WHERE email = ?", [userEmail]);
```

### Input Validation
```javascript
router.post("/user", async (req, res) => {
  // Validate input
  if (!req.body.name || !req.body.email) {
    return res.status(400).send({ error: "Name and email required" });
  }

  if (!req.body.email.includes('@')) {
    return res.status(400).send({ error: "Invalid email" });
  }

  const user = await User.create(req.body);
  res.send(user);
});
```

### Authentication Check
```javascript
router.post("/post", ensureLoggedIn, async (req, res) => {
  const post = await Post.create({
    user_id: req.user.id,  // From session
    title: req.body.title,
    content: req.body.content,
  });
  res.send(post);
});
```

## Common Errors & Solutions

### Error: Access denied for user
```bash
# Solution: Check credentials in .env
# Or grant permissions:
mysql -u root -p
GRANT ALL PRIVILEGES ON database_name.* TO 'user'@'localhost';
FLUSH PRIVILEGES;
```

### Error: Table doesn't exist
```sql
-- Check if database is selected
SELECT DATABASE();
USE my_database;

-- Check table name (case-sensitive on some systems)
SHOW TABLES;
```

### Error: Column count doesn't match
```sql
-- Make sure INSERT columns match VALUES
INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');
-- Not: INSERT INTO users VALUES ('Alice');  -- Missing columns!
```

### Error: Duplicate entry for key
```sql
-- A UNIQUE or PRIMARY KEY constraint is violated
-- Check existing data:
SELECT * FROM users WHERE email = 'alice@example.com';
-- Update instead of insert, or use different value
```
