import { Component, OnInit, Input } from '@angular/core';
import {Images} from '../../../shared/models/images.model';
import {GifUploadService} from '../../../shared/services/gif-upload.service';
import {User} from '../../../shared/models/user.model';
import {AuthenticationService} from '../../../shared/services/authentication.service';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';
import {AuthService, SocialUser} from 'angularx-social-login';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [fadeStateTrigger],
  host: { '[@fade]': '' }
})
export class DashboardComponent implements OnInit {
  @Input() image: Images;
  readonly: boolean;
  currentUser: User;
  user: SocialUser;
  guessArray: any[];
  isGuessTrue = false;
  public isCollapsed = true;

  constructor(private authenticationService: AuthenticationService,
              private authService: AuthService,
              private imageService: GifUploadService) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.getUserDetails();
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
    this.readFunc();
  }
  readFunc() {
    if (this.image.rating >= 1) {
      this.readonly = true;
    } else {
      this.readonly = false;
    }
  }
  rateChange = ($event) => {
    this.imageService.postRating($event, this.image._id, this.currentUser._id).subscribe(event => {
      this.readonly = true;
    }, error => {
      console.log(error);
    });
  }

  guessImg() {
    this.isGuessTrue = true;
    this.imageService.guessImage(this.image._id).subscribe(data => {
      this.guessArray = data;
    }, error => {
      this.isGuessTrue = false;
      console.log(error);
    });
  }
}
