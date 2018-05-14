import {Component, OnInit} from '@angular/core';
import {GifUploadService} from '../../shared/services/gif-upload.service';
import {Images} from '../../shared/models/images.model';
import {User} from '../../shared/models/user.model';
import {AuthenticationService} from '../../shared/services/authentication.service';

@Component({
  selector: 'app-created-files',
  templateUrl: './created-files.component.html',
  styleUrls: ['./created-files.component.css']
})
export class CreatedFilesComponent implements OnInit {
  images: Images;
  imageToShow: any[];
  isImageLoading: boolean;
  currentUser: User;

  constructor(private authenticationService: AuthenticationService,
              private imageService: GifUploadService) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.getUserDetails();
    this.getImageFromService();
  }

  deleteImage(_id: string) {
    this.imageService.deleteImages(_id).subscribe(() => {  this.getImageFromService()});
  }

  getImageFromService() {
    if (this.currentUser) {
      this.isImageLoading = true;
      this.imageService.getById(this.currentUser._id).subscribe(data => {
        this.imageToShow = data;
        this.isImageLoading = false;
      }, error => {
        this.isImageLoading = false;
        console.log(error);
      });
    } else {

    }
  }

}
