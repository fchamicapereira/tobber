let chai = require("chai");
let expect = require("chai").expect;
let crawl = require("../dist").crawl;

chai.use(require("chai-sorted"));

describe("complete", function() {
  this.slow(15000)
  this.timeout(20000) // 10 seconds
  
  it("should give results sorted", async function () {
    const results = await crawl("rick and morty", {
      sort: true,
      season: 2,
      limit: -1
    });

    console.log(JSON.stringify(results, null, 2));

    expect(results).to.not.equal(null);
    expect(results).to.be.an("object");
    expect(results.status).to.not.equal(undefined);
    expect(results.status).to.be.an("array");
    expect(results.status.length).to.not.equal(0);        
    expect(results.data).to.be.an("array");
    expect(results.data.length).to.not.equal(0);
    expect(results.data).to.be.descendingBy("score");
  });
});
