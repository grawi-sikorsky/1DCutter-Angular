//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/<name-of-app>'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/<name-of-app>/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
