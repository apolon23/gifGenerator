import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GifUploadService} from '../../shared/services/gif-upload.service';
import {Images} from '../../shared/models/images.model';
import {User} from '../../shared/models/user.model';
import {AuthenticationService} from '../../shared/services/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl:  'home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  images: Images[] = [];
  currentUser: User;
  query: any;
  constructor(private authenticationService: AuthenticationService,
              private imageService: GifUploadService,
              private route: ActivatedRoute) {
    this.route.queryParams
      .subscribe(val => this.query = val.query);
  }

  ngOnInit() {
    this.currentUser = this.authenticationService.getUserDetails();
    this.loadAllImages();
    }
  public loadAllImages() {
    if (this.currentUser) {
      this.imageService.getSixImages(this.currentUser._id).subscribe(images => { this.images = images; });
    } else {
      this.imageService.getSixUnregisteredImages().subscribe(images => { this.images = images; });
    }
  }
}
