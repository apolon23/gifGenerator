import { DomSanitizer } from '@angular/platform-browser';
import {SafeUrl} from '@angular/platform-browser/src/security/dom_sanitization_service';

export class Img {
  constructor(
    public file: File,
    private sanitizer: DomSanitizer,
    public blobUrl?: string,
    public rawUrl?: SafeUrl,
    public state?: string
  ) {
    this.blobUrl = this.getUrl();
    this.rawUrl = this.getRawUrl();
  }

  getUrl() {
    return window.URL.createObjectURL(this.file);
  }

  getRawUrl() {
    return this.sanitizer.bypassSecurityTrustUrl( this.getUrl() );
  }

  delImg() {
    this.state = 'uncheck';
  }

}
