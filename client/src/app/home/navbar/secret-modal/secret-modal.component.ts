import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SecretService } from './secret.service';
import { Secret } from './secret';

@Component({
  selector: 'app-secret-modal',
  templateUrl: './secret-modal.component.html',
  styleUrls: ['./secret-modal.component.css']
})
export class SecretModalComponent implements OnInit {
  secret: String;
  next: Date;

  constructor(
    private secretService: SecretService,
    public activeModal: NgbActiveModal
  ) {
    this.secretService.setTobberURL(location.hostname);
  }

  ngOnInit(): void {
    this.getSecret();
  }

  updateHelper(secret: Secret): void {
    this.secret = secret.secret;
    this.next = new Date(secret.next);
  }

  getSecret(): void {
    this.secretService.getSecret()
      .subscribe(secret => {
        this.updateHelper(secret);
      });
  }

  refreshSecret(): void {
    this.secretService.refreshSecret()
      .subscribe(secret => {
        this.updateHelper(secret);
      });
  }
}
