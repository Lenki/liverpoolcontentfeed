function combineFeeds(featuredFeed, generalFeed) {
    const combinedArticles = featuredFeed.items.concat(generalFeed.items);
    const combinedFeed = {
        articles: [...combinedArticles]
    };
    return combinedFeed;
}
exports.combineFeeds = combineFeeds;
