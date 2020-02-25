// import fs from 'fs';

import express from 'express';

import add from '../client/module';

const app = express();

app.use(express.static('dist'));

// const m = fs.readFileSync('dist/ma')

const manifest = require('../../dist/manifest.json');

// console.log(manifest);

app.get('/', (req, res) => {
    // res.send('HELLO9');
    console.log('1+2', add(1, 2));
    res.send(`<!doctype html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Hello</title>
        <link rel="stylesheet" href="${manifest['client.css']}">
    </head>
    <body>
    <div id="app"></div>
    BODY-7
    <script src="${manifest['client.js']}" defer></script>
    </body>
    </html>
    `);
});

// console.log('QWE');

// console.log('jkhasjkdha');

export default app;
