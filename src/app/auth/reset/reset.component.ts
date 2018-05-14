import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AlertService} from '../../shared/services/alert.service';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  form: FormGroup;
  emailPattern = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';

  constructor(private router: Router,
              private http: HttpClient,
              private userService: UserService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'Email': new FormControl(null, [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]),
    });
  }
  submitReset(Email) {
   this.userService.resetPassword(Email.value).subscribe(data => {
          this.alertService.successReg('Successfully, check your email');
          Email.value = null;
        },
        errorReg => {
          console.log(errorReg);
          this.alertService.errorReg(errorReg);
        });
  }
}
