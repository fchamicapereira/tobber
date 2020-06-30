let chai = require("chai");
let expect = require("chai").expect;
let getTorrentFromURL = require("../dist").getTorrentFromURL;

describe('getInfoFromURL', function () {
  this.slow(15000)
  this.timeout(20000) // 10 seconds

  it(`should get info from limetorrents`, async function () {
    const res = await getTorrentFromURL("https://www.limetorrents.cc/search/all/inception-//Inception-2010-2160p-BluRay-HEVC-DTS-HD-MA-5-1-COASTER-torrent-10384295.html");
  })

  it(`should get info from thepiratebay`, async function () {
    const res = await getTorrentFromURL("https://piratebays.be/torrent/7349754/Inception_(2010)_1080p_BrRip_x264_-_1.85GB_-_YIFY");
  })

  it(`should get info from 1337x`, async function () {
    const res = await getTorrentFromURL("https://1337x.to/torrent/2554075/SpiderMan-Homecoming-2017-KiSS-BluRay-720p-HD-AAC-Hindi-Eng-French-Subs-mkv/");
  })

  it(`should get info from zooqle`, async function () {
    const res = await getTorrentFromURL("https://zooqle.com/torrent9-red-spiderman-homecoming-2017-1080p-vff-en-x264-ac3-mhd-wq1gu.html");
  })

  it(`should get info from rarbg`, async function () {
    const res = await getTorrentFromURL("https://zooqle.com/torrent9-red-spiderman-homecoming-2017-1080p-vff-en-x264-ac3-mhd-wq1gu.html");
  })
})
