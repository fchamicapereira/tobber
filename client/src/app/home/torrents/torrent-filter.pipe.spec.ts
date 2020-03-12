import { TorrentFilterPipe } from './torrent-filter.pipe';

describe('TorrentFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new TorrentFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
