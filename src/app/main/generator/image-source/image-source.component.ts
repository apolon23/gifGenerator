import { Component } from '@angular/core';
import { GeneratorService } from '../../../shared/services/generator.service';
import { Img } from '../../../shared/models/image.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-image-source',
  templateUrl: './image-source.component.html',
  styleUrls: ['./image-source.component.css']
})
export class ImageSourceComponent {
  source: Array<Img> = [];
  gif: any;

  public isCollapsedInput = true;
  public isCollapsedRedactor = true;

  constructor(private generatorService: GeneratorService,
              private sanitizer: DomSanitizer
  ) {

  }

  onDrop(event) {
    this.handleFileInput(event.dataTransfer.files);
    event.preventDefault();
  }

  dragover(event) {
    event.preventDefault();
  }

   handleFileInput(files: FileList) {

    for (let i = 0; i < files.length; i++) {
      const img = new Img(files[i], this.sanitizer);
      img.state = 'checked';
      this.source.push(img);

    }
  }

  delImg(index) {
    this.source[index].delImg();
  }
}
