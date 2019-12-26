
require('dotenv').config();
const fs = require('fs');
const express = require('express');
const app = express();
const poll = require('./feeds/polling');
const sanitation = require('./feeds/util/response-sanitation');
const { combineFeeds }  = require("./feeds/util/combineFeeds");

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

app.get('/liverpoolfc/articles', (req, res) => {
    fs.readFile("./feeds/general-feed.txt", (err, data) => {

        if (err) console.log(`error reading general file : ${err.body}`);
        const generalFeed = JSON.parse(data)

        fs.readFile("./feeds/featured-feed.txt", (err, data) => {

            if (err) console.log(`error reading featured file : ${err.body}`);

            const featuredFeed = JSON.parse(data)
            const combinedFeed = combineFeeds(featuredFeed, generalFeed);
            const sanitisedArticles = sanitation.removeDuplicates(combinedFeed.articles)
            const sanitisedFeeds = { articles : [...sanitisedArticles] }
            res.send(sanitisedFeeds);
        });
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));