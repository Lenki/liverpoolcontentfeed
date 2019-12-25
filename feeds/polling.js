const request = require('request');
const sanitiser = require('./util/response-sanitation');
const email = require('./util/email-reminder');
const {writeFile} = require('./util/writeToFile');

const THIRTY_MIN = 1.8e6;
const STREAM_ID = 'user/a9d30e18-47ec-4606-b3b8-46aa2c138647/category/96e0529d-bdbd-4e15-b75b-48ecc0f3c3a2'

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

                    if (response.errorCode == 401) {
                        email.sendMail(body)
                        return;
                    }
                    const articles = sanitiser.stripFeed(response);

                    writeFile("./feeds/featured-feed.txt", articles)
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

                    if (response.errorCode == 401) {
                        email.sendMail(body)
                        return;
                    }
                    const articles = sanitiser.stripFeed(response);

                    writeFile("./feeds/general-feed.txt", articles)
                }
            )
        }, THIRTY_MIN)
    }
}