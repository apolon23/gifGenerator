import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/models/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {UserService} from '../../shared/services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  user: User;
  selectedUser: User;
  users: User[] = [];
  form: FormGroup;
  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.authenticationService.getUserDetails();
    this.loadAllUsers();
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, [Validators.required]),
    });
  }
  deleteUser(_id: string) {
    this.userService.deleteUser(_id).subscribe(() => { this.loadAllUsers()});
  }
  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
  }
  onSelect(user: User) {
    this.selectedUser = user;
  }
  userUpdate(): void {
    this.userService.updateUser(this.selectedUser)
      .subscribe(data => console.log(data));
  }
  add(name: string, email: string, password: string): void {
    name = name.trim();
    email = email.trim();
    password = password.trim();
    if (!name && !email && !password) {
      return;
    }
    this.userService.addUser({name, email, password} as User)
      .subscribe(user => {
        this.users.push(user);
      });
  }
}
