import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TorrentClientComponent } from './torrent-client.component';

describe('TorrentClientComponent', () => {
  let component: TorrentClientComponent;
  let fixture: ComponentFixture<TorrentClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TorrentClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TorrentClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
