let chai = require("chai")
let expect = require("chai").expect
let helpers = require('./helpers')
let scoreRules = require("../dist").getScoreRules();
const pipelinePath = __dirname + '/../dist/pipeline';

describe('pipeline', function () {

  describe('filter', function () {
    const filter = require(pipelinePath + '/filter').default

    it('should filter torrents that don\'t include the wanted episode', function () {
      var data = [
        { title: 'paio episode 3' },
        { title: 'paio' },
        { title: 'paio episode 5' }
      ]
      var newData = filter({
        data: data,
        options: {
          search: 'paio episode 5',
          epQuery: ''
        }
      })

      expect(newData).to.exist
      expect(newData).to.be.an('array').that.is.not.empty
      expect(newData.length).to.equal(1)
      expect(newData[0].title).to.be.equal('paio episode 5')
    })

    it('should filter all content that doesn\'t include all words in search', function () {
      var data = [
        { title: 'paio episode 3' },
        { title: 'paio' },
        { title: 'paio episode 5 lolz 1' },
        { title: 'episode 5 lolz 1' },
        { title: 'lolz paio 1' }
      ]
      var newData = filter({
        data: data,
        options: {
          search: 'lolz 1 paio',
          epQuery: ''
        }
      })

      expect(newData).to.exist
      expect(newData).to.be.an('array').that.is.not.empty
      expect(newData).to.be.eql([{ title: 'paio episode 5 lolz 1' }, { title: 'lolz paio 1' }])
    })
  })

  describe('properties', function () {
    const properties = require(pipelinePath + '/properties').default

    it('should get properties that are shown in title', function () {
      // because this test envolves random data, it can fail
      // fail once, it's amazingly rare
      // fail twice, please go get a lottery ticket
      // fail thrice just kill yourself

      this.retries(3)
      
      for (let i = 0; i < 50; i++) {
        let data = helpers.getTitleAndProperties(scoreRules)
        let propertiesGiven = properties({ title: data.title }, scoreRules)

        expect(propertiesGiven).to.exist
        expect(propertiesGiven).to.be.an('object')
        expect(propertiesGiven).to.be.eql(data.properties,
          `
            title: ${data.title}
            chosenProperties: ${JSON.stringify(data.properties)}
            propertiesGiven: ${JSON.stringify(propertiesGiven)}
        `)
      }
    })
  })

  describe('score', function () {
    const score = require(pipelinePath + '/score').default

    it('should give 0 if size is not given', function () {
      const result = score({ title: 'this is an example' })

      expect(result).to.exist
      expect(result).to.be.a('number')
      expect(result).to.be.equal(0)
    })

    it('should give log of size if torrent doesn\'t have properties', function () {
      const result = score({ title: 'this is an example', size: '26 Gb' }, {}, scoreRules)

      expect(result).to.exist
      expect(result).to.be.a('number')
      expect(result).to.be.equal(Math.log(26e9))
    })
  })
})
