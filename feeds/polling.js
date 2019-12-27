const request = require('request');
const sanitation = require('./util/response-sanitation');
const email = require('./util/email-reminder');
const {storeData} = require('./util/storeData');

const TWENTY_NINE_MINS = 1.74e6;

module.exports = {
    liverpoolFeeds: function (database) {
        setInterval(() => {
            request(
                'https://feedly.com/v3/mixes/contents',
                {
                    headers: { [process.env.AUTH_KEY]: process.env.AUTH_VALUE },
                    qs: {
                        streamId: process.env.STREAM_ID,
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
                    const articles = sanitation.stripFeed(response);

                    storeData('featured', articles, database)
                }
            )

            request(
                'https://feedly.com/v3/streams/contents',
                {
                    headers: { [process.env.AUTH_KEY]: process.env.AUTH_VALUE },
                    qs: {
                        streamId: process.env.STREAM_ID,
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
                    const articles = sanitation.stripFeed(response);

                    storeData('general', articles, database)
                }
            )
        }, TWENTY_NINE_MINS)
    }
}