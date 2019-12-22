require('dotenv').config();
const fs = require('fs');
const express = require('express');
const app = express();
const poll = require('./feeds/polling');

const port = process.env.PORT;

poll.liverpoolFeeds();

app.get('/liverpoolfc/articles/featured', (req, res) => {
    fs.readFile("./feeds/featured-feed.txt", (err, data) => {
        if (err) console.log(`error reading featured file : ${err.body}`);
        res.send(JSON.parse(data));
    });
})

app.get('/liverpoolfc/articles/general', (req, res) => {
    fs.readFile("./feeds/general-feed.txt", (err, data) => {
        if (err) console.log(`error reading general file : ${err.body}`);
        res.send(JSON.parse(data));
    });
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`));