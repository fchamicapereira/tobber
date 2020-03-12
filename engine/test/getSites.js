let expect = require("chai").expect;
let engine = require("../dist");

describe('get sites', function () {
  it('should give all the available sites', function () {
    let sites = engine.getSites()
    expect(sites).to.exist
    expect(sites).to.not.be.empty
    expect(sites.length).to.equal(6)
  })
})
