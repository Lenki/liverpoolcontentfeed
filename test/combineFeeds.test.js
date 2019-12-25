var assert = require('assert');
const { combineFeeds } = require('../feeds/util/combineFeeds');

describe('combineFeeds', function () {
    describe('combine two feed objects', function () {

        it('should contain single array containing both items', function () {
            const obj1 = { items: [{ one: 'one' }] };
            const obj2 = { items: [{ two: 'two' }] };

            const expected = { articles: [{ one: 'one' }, { two: 'two' }] };

            assert.deepEqual(combineFeeds(obj1,obj2), expected);
        });

        it('"items" key should be renamed to "articles"', function () {
            const obj1 = { items: [{ one: 'one' }] };
            const obj2 = { items: [{ two: 'two' }] };

            const expected = ["articles"];
            const articles = combineFeeds(obj1,obj2);
            assert.deepEqual(Object.keys(articles), expected);
        });

        it('array size should be three when a list of two is added to a list of one.', function () {
            const obj1 = { items: [{ one: 'one' }, { two: 'two' }] };
            const obj2 = { items: [{ two: 'two' }] };

            const expected = { articles: [{ one: 'one' }, { two: 'two' }, { two: 'two' }] };

            assert.deepEqual(combineFeeds(obj1,obj2), expected);
        });
    });
});