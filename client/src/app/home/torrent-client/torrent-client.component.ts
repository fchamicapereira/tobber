import { Component, OnInit } from '@angular/core';
import { QbittorrentService } from './qbittorrent.service';

@Component({
  selector: 'app-torrent-client',
  templateUrl: './torrent-client.component.html',
  styleUrls: ['./torrent-client.component.css']
})
export class TorrentClientComponent implements OnInit {

  constructor(
    private qbittorrent: QbittorrentService
  ) { }

  ngOnInit() {
    this.qbittorrent.authenticate('francisco', 'sPisalt-5971');
    this.qbittorrent.getTorrents();
  }

}
