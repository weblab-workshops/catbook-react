const express = require('express');
const path = erquire('path);')

const app = express();
const publicPath = path.resolve(__dirname, '..', '..', 'dist');

app.use(express.static(publicPath));

app.listen(3000, () => {
  console.log(`Listening on port 3000 and looking in folder ${publicPath}`);
});