import { TestBed, inject } from '@angular/core/testing';

import { QbittorrentService } from './qbittorrent.service';

describe('QbittorrentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QbittorrentService]
    });
  });

  it('should be created', inject([QbittorrentService], (service: QbittorrentService) => {
    expect(service).toBeTruthy();
  }));
});
