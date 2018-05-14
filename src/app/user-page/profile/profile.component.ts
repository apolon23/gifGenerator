import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/models/user.model';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {PasswordValidation} from '../../auth/helpers/password-validation';
import {UserService} from '../../shared/services/user.service';
import {AuthService, SocialUser} from 'angularx-social-login';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  changePasswordForm: FormGroup;
  user: User;
  socUser: SocialUser;
  loggedIn: boolean;
  constructor(private userService: UserService,
              private authService: AuthService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.user = this.authenticationService.getUserDetails();
    this.changePasswordForm = new FormGroup({
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'confirmPassword': new FormControl(null, [Validators.required, PasswordValidation('password')])
    });
    this.authService.authState.subscribe((user) => {
      this.socUser = user;
      this.loggedIn = (user != null);
    });
  }
  passUpdate(): void {
    this.userService.updatePassword(this.user)
      .subscribe(data => console.log(data));
  }
}
