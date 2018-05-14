import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {Router} from '@angular/router';
import {User} from '../../shared/models/user.model';
import {AuthService, SocialUser} from 'angularx-social-login';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {
  currentUser: User;
  user: SocialUser;
  loggedIn: boolean;
  constructor(private authenticationService: AuthenticationService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.getUserDetails();
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  openAdminMenu() {
    let el =  document.getElementById('admin-nav');
    el.classList.toggle('down');
    let burg = document.getElementById('burg');
    burg.classList.toggle('cat');

  }
}
