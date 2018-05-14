import { Component, OnInit } from '@angular/core';
import {Images} from '../../shared/models/images.model';
import {GifUploadService} from '../../shared/services/gif-upload.service';

@Component({
  selector: 'app-manage-page',
  templateUrl: './manage-page.component.html',
  styleUrls: ['./manage-page.component.css']
})
export class ManagePageComponent implements OnInit {
  images: Images[] = [];
  constructor(private imageService: GifUploadService) { }

  ngOnInit() {
    this.loadAllImages();
  }
  private loadAllImages() {
    this.imageService.getAllAdminImages().subscribe(images => { this.images = images; });
  }
  deleteImage(_id: string) {
    this.imageService.deleteImages(_id).subscribe(() => {   this.loadAllImages()});
  }
}
