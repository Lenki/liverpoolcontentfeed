require('dotenv').config();
const express = require('express');
const app = express();
const poll = require('./feeds/polling');
const sanitation = require('./feeds/util/response-sanitation');
const { combineFeeds } = require("./feeds/util/combineFeeds");
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});
const db = admin.firestore();
const port = process.env.PORT;

poll.liverpoolFeeds(db);

app.get('/liverpoolfc/articles', (req, res) => {
    db.collection('feeds').get()
        .then((snapshot) => {
            var articles = []
            snapshot.forEach((doc) => {
                articles.push(doc.data())
            });
            const combinedFeed = combineFeeds(articles[0], articles[1]);
            const sanitisedArticles = sanitation.removeDuplicates(combinedFeed.articles)
            const sanitisedFeeds = {
                feed_last_published: articles[0].published,
                articles: [...sanitisedArticles]
            }
            res.send(sanitisedFeeds);
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));