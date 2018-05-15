import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AlertService} from '../../shared/services/alert.service';
import {AuthenticationService } from '../../shared/services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {UserService} from '../../shared/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  user: SocialUser;

  constructor(private userService: UserService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private authService: AuthService
              ) {}
  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

      }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.userService.postSocialUser(user).subscribe(data => {
        this.router.navigate(['/']);
      });
    });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.userService.postSocialUser(user).subscribe(data => {
        this.router.navigate(['/']);
      });
    });
  }

  login() {
    this.authenticationService.login(this.form.value.email, this.form.value.password)
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          this.alertService.error(error);
        });
  }

}

