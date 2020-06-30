let chai = require("chai");
let expect = require("chai").expect;
let crawl = require("../dist").crawl;
let scoreRules = require("../dist").getScoreRules();

chai.use(require("chai-sorted"));

describe('options', function () {
  this.slow(15000)
  this.timeout(20000)
  var data

  before('getting data for options', async function () {
    const opt = {
      sort: true,
      anime: false,
      skip: ['limetorrents', 'rarbg', 'thepiratebay', 'zooqle']
    }

    const results = await crawl('game of thrones', opt);
  
    expect(results).to.exist
    expect(results).to.be.an('object')
    expect(results).to.have.own.property('data')
    expect(results.data).to.be.an('array').that.is.not.empty
    data = results
  })

  it('should grab data even with no opt', async function () {
    const results = await crawl('game of thrones');
    
    expect(results).to.exist
    expect(results).to.be.an('object')
    expect(results).to.have.own.property('data')
    expect(results.data).to.be.an('array').that.is.not.empty
  })

  it('should be able to sort', function () {
    expect(data).to.exist
    expect(data).to.be.an('object')
    expect(data).to.have.own.property('data')
    expect(data.data).to.be.an('array').that.is.not.empty
    expect(data.data[0]).to.be.an('object')
    expect(data.data[0]).to.have.own.property('score')
    expect(data.data).to.be.descendingBy('score')
  })

  it('should not sort if asked to', async function () {
    const results = await crawl('game of thrones', { sort: false })
    
    expect(data).to.exist
    expect(data).to.be.an('object')
    expect(data).to.have.own.property('data')
    expect(data.data).to.be.an('array').that.is.not.empty
    expect(data.data[0]).to.be.an('object')
    expect(data.data[0]).to.have.own.property('score')
    expect(data.data).to.be.descendingBy('score', false)
  })

  it('should be able to skip sites', function () {
    expect(data).to.exist
    expect(data).to.be.an('object')
    expect(data).to.have.own.property('status')
    expect(data.status).to.exist
    expect(data.status).to.be.an('array').that.is.not.empty
    expect(data.status.length).to.equal(1)
    expect(data.status[0].site).to.equal('1337x')
  })

  it('should be able to get raw torrent data', async function () {
    const results = await crawl('inception', { getRaw: true, skip: ['limetorrents', 'rarbg', 'thepiratebay', 'zooqle'] })
    
    expect(results).to.exist
    expect(results).to.be.an('object')
    expect(results).to.have.own.property('status')
    expect(results).to.have.own.property('data')
  })
})
