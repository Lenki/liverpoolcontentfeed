var assert = require('assert');
const sanitation = require('../feeds/util/response-sanitation');
const popularFeed = require('../test/util/popularfeedtest.json')
const empireOfTheKopFeed = require('../test/util/empireofthekopfeed.json')
const duplicateItemsFeed = require('../test/util/duplicateItemsFeed.json')

describe('Response Sanitation - stripFeed()', function () {
    describe('new object creation', function () {

        it('should contain originId, title and visual', function () {
            const sanitisedFeed = sanitation.stripFeed(popularFeed);
            const firstItem = sanitisedFeed.items[0]
            assert.deepEqual(Object.keys(firstItem), ["originId", "title", "visual", "published"]);
        });

        it('visual should contain a url', function () {
            const sanitisedFeed = sanitation.stripFeed(popularFeed);
            const firstItem = sanitisedFeed.items[0].visual
            assert.deepEqual(Object.keys(firstItem), ["url"]);
        });

        it('empire of the cop url stripped out and replaced with constant', function () {
            const sanitisedFeed = sanitation.stripFeed(empireOfTheKopFeed);
            assert.deepEqual(empireOfTheKopFeed.items[39].visual.url, 'none')
            assert.deepEqual(sanitisedFeed.items[39].visual.url, "https://pbs.twimg.com/profile_images/1138760979880304641/B72IMxOm_400x400.jpg");
        });

        it('should be no duplicate articles once sanitised', function () {
            const sanitisedFeed = sanitation.stripFeed(duplicateItemsFeed);
            assert.equal(sanitisedFeed.items.length, 1)
        });
    });

    describe('removeDuplicates reduces iterable with property originId', () => {
        it('should reduce list from 3 items to 1', () => {
            assert.equal(duplicateItemsFeed.items.length, 3)
            assert.equal(sanitation.removeDuplicates(duplicateItemsFeed.items).length, 1)
        })
    })
});