import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../shared/services/authentication.service';
import {User} from '../shared/models/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService, SocialUser} from 'angularx-social-login';


@Component({
  selector: 'app-main',
  templateUrl:  'main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  currentUser: User;
  user: SocialUser;
  constructor(private authenticationService: AuthenticationService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.currentUser = this.authenticationService.getUserDetails();
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  onLogout() {
    if (this.user) {
      this.authService.signOut();
    }
    this.authenticationService.logout();
    this.router.navigate(['/auth/login']);
  }

  openSlideMenu() {
    let el =  document.getElementById('side-menu');
    el.classList.toggle('visible');
    let overlay = document.getElementById('add-overlay');
    overlay.classList.toggle('side-nav-overlay');
  }

  closeSlideMenu() {
    let el =  document.getElementById('side-menu');
    el.classList.remove('visible');
    let overlay = document.getElementById('add-overlay');
    overlay.classList.remove('side-nav-overlay');
  }
  removeOverlay() {
    let overlay = document.getElementById('add-overlay');
    overlay.classList.remove('side-nav-overlay');
    let el =  document.getElementById('side-menu');
    el.classList.remove('visible');
  }

}
