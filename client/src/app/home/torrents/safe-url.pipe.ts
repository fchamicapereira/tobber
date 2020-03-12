import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';

@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {

  constructor(
    private sanitizer: DomSanitizer
  ) {}

  transform(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
