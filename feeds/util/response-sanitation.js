
const _ = require('lodash');

const ALTERNATE_SOURCE_ID = 'p='
const YOUTUBE_VIDEO_ID = "yt:"
const EMPIRE_OF_THE_KOP = 'empireofthekop'
const EMPIRE_OF_THE_KOP_IMAGE = "https://pbs.twimg.com/profile_images/1138760979880304641/B72IMxOm_400x400.jpg"

const stripFeed = (feed) => {
    var articles = {};
    const feedSize = feed.items.length;
    // TODO - make functional
    for (let i = 0; i < feedSize; i++) {
        var article = _.pick(feed, [`items[${i}].originId`, `items[${i}].title`, `items[${i}].visual.url`, `items[${i}].published`]);
        const articleSource = _.get(article, `items[${i}].originId`);
        if (articleSource.includes(EMPIRE_OF_THE_KOP)) {
            article = _.set(article, `items[${i}].visual.url`, EMPIRE_OF_THE_KOP_IMAGE);
        }
        if (articleSource.includes(ALTERNATE_SOURCE_ID) || articleSource.includes(YOUTUBE_VIDEO_ID)) {
            article = _.set(article, `items[${i}].originId`, _.get(feed, `items[${i}].alternate[0].href`))
        }
        articles = _.merge(articles, article);
    }
    const filteredList =  removeDuplicates(articles.items);

    return { items: [...filteredList] }
}

const removeDuplicates = (listOfArticles) => {
    return _.uniqBy(listOfArticles, 'originId');
}

const addTimeStamp = (listOfArticles) => {
    return {
        published : Date.now(),
        ...listOfArticles
    }
}

exports.stripFeed = stripFeed;
exports.removeDuplicates = removeDuplicates;
exports.addTimeStamp = addTimeStamp;
