# SQL & MySQL Cheatsheet

## MySQL CLI Basics

### Connecting to MySQL
```bash
# Connect as root
mysql -u root -p

# Connect as specific user to specific database
mysql -u app -p web_lab

# Connect without password (if no password set)
mysql -u root

# Exit MySQL
EXIT;
# or
\q
```

## Quick Reference

### Most Used Commands
```sql
-- See everything
SHOW DATABASES;
USE database_name;
SHOW TABLES;
SELECT * FROM table_name;

-- Basic CRUD
INSERT INTO table_name (col1, col2) VALUES (val1, val2);
SELECT * FROM table_name WHERE condition;
UPDATE table_name SET col1 = val1 WHERE condition;
DELETE FROM table_name WHERE condition;

-- Relationships
SELECT * FROM table1
INNER JOIN table2 ON table1.id = table2.foreign_id;
```

### Keyboard Shortcuts in MySQL CLI
- `Ctrl + C`: Cancel current command
- `Ctrl + D`: Exit MySQL
- `\c`: Clear/cancel current statement
- `\G`: Display results vertically
- `↑/↓`: Navigate command history

## Database Commands
```sql
-- Show all databases
SHOW DATABASES;

-- Create a new database
CREATE DATABASE my_database;

-- Use a specific database
USE my_database;

-- Delete a database (CAREFUL!)
DROP DATABASE my_database;

-- Show current database
SELECT DATABASE();
```

### Table Commands
```sql
-- Show all tables in current database
SHOW TABLES;

-- Show table structure
DESCRIBE table_name;
-- or
SHOW COLUMNS FROM table_name;

-- Show CREATE statement for table
SHOW CREATE TABLE table_name;

-- Drop a table (CAREFUL!)
DROP TABLE table_name;
```

### User Management
```sql
-- Create a new user
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';

-- Grant all privileges on a database
GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'localhost';

-- Grant specific privileges
GRANT SELECT, INSERT, UPDATE ON database_name.* TO 'username'@'localhost';

-- Apply privilege changes
FLUSH PRIVILEGES;

-- Show current user
SELECT USER();

-- Show all users
SELECT user, host FROM mysql.user;

-- Remove a user
DROP USER 'username'@'localhost';
```

## SQL Query Basics

### CREATE TABLE
```sql
-- Basic table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table with foreign key
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS table_name (
  -- columns here
);
```

### Common Data Types
```sql
-- Numbers
INT                    -- Integer (-2B to 2B)
BIGINT                 -- Large integer
DECIMAL(10,2)          -- Fixed decimal (10 digits, 2 after decimal)
FLOAT, DOUBLE          -- Floating point

-- Strings
VARCHAR(255)           -- Variable length string (max 255)
TEXT                   -- Long text (up to 65,535 characters)
CHAR(10)               -- Fixed length string

-- Dates
DATE                   -- Date only (YYYY-MM-DD)
DATETIME               -- Date and time
TIMESTAMP              -- Timestamp (auto-updated)

-- Boolean
BOOLEAN                -- True/false (stored as TINYINT 0/1)
```

### INSERT (Create)
```sql
-- Insert single row
INSERT INTO users (name, email)
VALUES ('Alice', 'alice@example.com');

-- Insert multiple rows
INSERT INTO users (name, email) VALUES
  ('Bob', 'bob@example.com'),
  ('Charlie', 'charlie@example.com');

-- Insert with all columns (not recommended)
INSERT INTO users VALUES (1, 'Dave', 'dave@example.com', NOW());
```

### SELECT (Read)
```sql
-- Select all columns
SELECT * FROM users;

-- Select specific columns
SELECT name, email FROM users;

-- Filter with WHERE
SELECT * FROM users WHERE id = 1;
SELECT * FROM users WHERE name = 'Alice';
SELECT * FROM users WHERE created_at > '2024-01-01';

-- Multiple conditions
SELECT * FROM users WHERE name = 'Alice' AND email LIKE '%@example.com';
SELECT * FROM users WHERE id = 1 OR id = 2;

-- Pattern matching
SELECT * FROM users WHERE email LIKE '%@gmail.com';
SELECT * FROM users WHERE name LIKE 'A%';  -- Starts with A

-- Ordering
SELECT * FROM users ORDER BY created_at DESC;
SELECT * FROM users ORDER BY name ASC;

-- Limit results
SELECT * FROM users LIMIT 10;
SELECT * FROM users LIMIT 5 OFFSET 10;  -- Skip first 10, get next 5

-- Count rows
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM users WHERE email LIKE '%@gmail.com';
```

### UPDATE
```sql
-- Update single field
UPDATE users SET name = 'Alice Smith' WHERE id = 1;

-- Update multiple fields
UPDATE users
SET name = 'Alice Smith', email = 'asmith@example.com'
WHERE id = 1;

-- Update all rows (CAREFUL! No WHERE clause)
UPDATE users SET created_at = NOW();

-- Update with calculation
UPDATE posts SET view_count = view_count + 1 WHERE id = 5;
```

### DELETE
```sql
-- Delete specific rows
DELETE FROM users WHERE id = 1;
DELETE FROM users WHERE email LIKE '%@spam.com';

-- Delete all rows (CAREFUL!)
DELETE FROM users;

-- Better: TRUNCATE (faster for deleting all)
TRUNCATE TABLE users;
```

## Advanced SQL

### JOINs
```sql
-- INNER JOIN (only matching rows)
SELECT users.name, posts.title
FROM users
INNER JOIN posts ON users.id = posts.user_id;

-- LEFT JOIN (all users, even without posts)
SELECT users.name, posts.title
FROM users
LEFT JOIN posts ON users.id = posts.user_id;

-- Multiple JOINs
SELECT users.name, posts.title, comments.content
FROM users
INNER JOIN posts ON users.id = posts.user_id
INNER JOIN comments ON posts.id = comments.post_id;
```

### Aggregation
```sql
-- Count, Sum, Average, Min, Max
SELECT COUNT(*) FROM posts;
SELECT AVG(view_count) FROM posts;
SELECT SUM(likes) FROM posts;
SELECT MIN(created_at), MAX(created_at) FROM posts;

-- Group by
SELECT user_id, COUNT(*) as post_count
FROM posts
GROUP BY user_id;

-- Group by with condition
SELECT user_id, COUNT(*) as post_count
FROM posts
GROUP BY user_id
HAVING COUNT(*) > 5;

-- Multiple aggregations
SELECT
  user_id,
  COUNT(*) as post_count,
  AVG(view_count) as avg_views
FROM posts
GROUP BY user_id;
```

### Subqueries
```sql
-- Subquery in WHERE
SELECT * FROM users
WHERE id IN (SELECT user_id FROM posts WHERE view_count > 1000);

-- Subquery in FROM
SELECT AVG(post_count) FROM (
  SELECT user_id, COUNT(*) as post_count
  FROM posts
  GROUP BY user_id
) AS user_posts;
```

### ALTER TABLE
```sql
-- Add column
ALTER TABLE users ADD COLUMN age INT;

-- Drop column
ALTER TABLE users DROP COLUMN age;

-- Modify column
ALTER TABLE users MODIFY COLUMN name VARCHAR(200);

-- Rename column
ALTER TABLE users CHANGE old_name new_name VARCHAR(100);

-- Add foreign key to existing table
ALTER TABLE posts
ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Add index
ALTER TABLE users ADD INDEX idx_email (email);
```

### Indexes
```sql
-- Create index
CREATE INDEX idx_user_email ON users(email);

-- Create unique index
CREATE UNIQUE INDEX idx_username ON users(username);

-- Multi-column index
CREATE INDEX idx_user_post ON posts(user_id, created_at);

-- Show indexes
SHOW INDEX FROM users;

-- Drop index
DROP INDEX idx_user_email ON users;
```

## Transactions
```sql
-- Start transaction
START TRANSACTION;
-- or
BEGIN;

-- Make changes
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- Commit (save changes)
COMMIT;

-- Or rollback (undo changes)
ROLLBACK;
```
