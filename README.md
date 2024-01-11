# catbook-react

## start up

run `npm start` in one terminal and `npm run hotloader` in another

To run the LLM parts of the app:
1. Make a virtual environment: `python3 -m venv .venv`
2. Activate the virtual environment (venv): `. .venv/bin/activate`
3. Install the dependencies from requirements.txt in the venv: `pip install -r requirements.txt`
4. Run the local ChromaDB instance: `chroma run`
5. Set the environment variable `ANYSCALE_API_KEY`. Using a .env file is probably the simplest way to do this.

visit `http://localhost:5050`

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
