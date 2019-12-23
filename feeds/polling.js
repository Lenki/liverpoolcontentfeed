const fs = require('fs');
const request = require('request');
const _ = require('lodash');
// Response to expired token. Email me a reminder!
const THIRTY_MIN = 1.8e6;
const STREAM_ID = 'user/a9d30e18-47ec-4606-b3b8-46aa2c138647/category/96e0529d-bdbd-4e15-b75b-48ecc0f3c3a2'


// TODO: filter empireofthekop "https://pbs.twimg.com/profile_images/1138760979880304641/B72IMxOm_400x400.jpg"


// {
//   "errorCode": 401,
//   "errorId": "ap7int-sv2.2019122315.425028",
//   "errorMessage": "unauthorized access: not logged in"
// }

module.exports = {
    liverpoolFeeds: function () {
        setInterval(() => {
            request(
                'https://feedly.com/v3/mixes/contents',
                {
                    headers: { [process.env.AUTH_KEY]: process.env.AUTH_VALUE },
                    qs: {
                        streamId: STREAM_ID,
                        count: 3,
                        hours: 9,
                    }
                },
                (err, res, body) => {
                    const response = JSON.parse(body);
                    var articles = {}

                    for (let i = 0; i <= 2; i++) {
                        const article = _.pick(response, [`items[${i}].originId`,`items[${i}].title`,`items[${i}].visual.url`])
                        articles = _.merge(articles, article)
                    }

                    fs.writeFile("./feeds/featured-feed.txt", JSON.stringify(articles), (err) => {
                        if (err) {
                            console.log("error writing to featured file")
                        } else {
                            console.log("successfully wrote featured file")
                        }
                    });
                }
            )

            request(
                'https://feedly.com/v3/streams/contents',
                {
                    headers: { [process.env.AUTH_KEY]: process.env.AUTH_VALUE },
                    qs: {
                        streamId: STREAM_ID,
                        count: 40,
                        ranked: 'newest',
                        similar: true,
                    }
                },
                (err, res, body) => {
                    const response = JSON.parse(body);
                    var articles = {}

                    for (let i = 0; i <= 39; i++) {
                        const article = _.pick(response, [`items[${i}].originId`,`items[${i}].title`,`items[${i}].visual.url`])
                        articles = _.merge(articles, article)
                    }
                    
                    fs.writeFile("./feeds/general-feed.txt", JSON.stringify(articles), (err) => {
                        if (err) {
                            console.log("error writing to general file")
                        } else {
                            console.log("successfully wrote to general file")
                        }
                    });
                }
            )
        }, 10000)
    }
}