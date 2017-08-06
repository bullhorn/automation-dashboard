const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);

mongoose.connection.on('connected', () => {
    console.log(`Connected to database: ${process.env.DATABASE_URL}`)
});

mongoose.connection.on('error', error => {
    console.log(`Database error: ${error}`);
});

mongoose.Promise = global.Promise;

const test = require('./server/routes/test');
const team = require('./server/routes/team');
const result = require('./server/routes/result');
const project = require('./server/routes/project');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));

app.use(cors());

app.use('/test', test);
app.use('/team', team);
app.use('/result', result);
app.use('/project', project)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = 3000
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));