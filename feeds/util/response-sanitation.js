
const _ = require('lodash');

const EMPIRE_OF_THE_KOP = 'empireofthekop'
const EMPIRE_OF_THE_KOP_IMAGE = "https://pbs.twimg.com/profile_images/1138760979880304641/B72IMxOm_400x400.jpg"

const stripFeed = (feed) => {
    var articles = {};
    const feedSize = feed.items.length;
    // TODO - make functional
    for (let i = 0; i < feedSize; i++) {
        var article = _.pick(feed, [`items[${i}].originId`, `items[${i}].title`, `items[${i}].visual.url`]);
        const articleSource = _.get(article, `items[${i}].originId`);
        if (articleSource.includes(EMPIRE_OF_THE_KOP)) {
            article = _.set(article, `items[${i}].visual.url`, EMPIRE_OF_THE_KOP_IMAGE);
        }
        articles = _.merge(articles, article);
    }
    // const filteredList =  _.uniqBy(articles.items, 'originId');
    const filteredList =  removeDuplicates(articles.items);

    return { items: [...filteredList] }
}

const removeDuplicates = (listOfArticles) => {
    return _.uniqBy(listOfArticles, 'originId');
}

exports.stripFeed = stripFeed;
exports.removeDuplicates = removeDuplicates;
