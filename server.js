//Install express server
const express = require('express');
const path = require('path');

const app = express();

app.options('*', cors()) // include before other routes


// Serve only the static files form the dist directory
app.use(express.static('./dist/OneDCutter-A'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/OneDCutter-A/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
