# catbook-react

## start up

run `npm start` in one terminal and `npm run hotloader` in another

visit `http://localhost:5050`

## Setting up MySQL:

### Running locally
1) Install with brew:
```bash
brew install mysql
```

- Start MySQL: brew services start mysql

2) Add dependencies to node app
```bash
npm install mysql2
```
*** Make sure you also have dotenv and express installed already

3) Add DB credentials to .env
```bash
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306

MYSQL_USER=app
MYSQL_PASSWORD=app
MYSQL_DATABASE=catbook

SESSION_SECRET=dev-secret
```

4) Create your database + add new user:
- Login as root (press enter when asked for password):
```bash
mysql -u root -p
```
- Run the following commands and fill <> in with credentials from your .env:
a. Create DB:
```bash
CREATE DATABASE IF NOT EXISTS <your_database_name>;
```

b. Create user:
```bash
CREATE USER IF NOT EXISTS '<your_username>'@'localhost' IDENTIFIED BY '<your_password>';
CREATE USER IF NOT EXISTS '<your_username>'@'127.0.0.1' IDENTIFIED BY '<your_password>';

GRANT ALL PRIVILEGES ON <your_database_name>.* TO '<your_username>'@'localhost';
GRANT ALL PRIVILEGES ON <your_database_name>.* TO '<your_username>'@'127.0.0.1';

FLUSH PRIVILEGES;
```

## don't touch

the following files students do not need to edit. feel free to read them if you would like.

```
client/dist/index.html
client/src/index.js
client/src/utilities.js
client/src/client-socket.js
server/validator.js
server/server-socket.js
.babelrc
.npmrc
.prettierrc
package-lock.json
webpack.config.js
```
