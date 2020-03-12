let expect = require("chai").expect;
let crawl = require("../dist").crawl;

describe('connection', function () {

  const categories = {
    tvshows: ['1337x', 'limetorrents', 'rarbg', 'thepiratebay', 'zooqle'],
    anime: ['nyaa']
  }

  Object.keys(categories).forEach(function (category) {
    const sites = categories[category]

    describe(category, function () {

      this.slow(15000)
      this.timeout(20000) // 10 seconds

      sites.forEach(function (site, index) {
        it(`should connect to ${site}`, async function () {
          const opt = {
            sort: false,
            metadata: false,
            skip: sites.slice(0, index).concat(sites.slice(index + 1)),
            anime: category === 'anime'
          }

          const results = await crawl('game of thrones', opt);
          
          expect(results).to.exist
          expect(results).to.be.an('object')
          expect(results).to.have.own.property('status')
          expect(results.status).to.be.an('array').that.is.not.empty
          expect(results.status[0]).to.be.an('object')
          expect(results.status[0]).to.have.own.property('site')
          expect(results.status[0]).to.have.own.property('status')
          expect(results.status[0].site).to.equal(site)
          expect(results.status[0].status).to.be.oneOf(['done', 'empty data'])
        })
      })
    })
  })
})
