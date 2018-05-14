import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { UserService} from '../../shared/services/user.service';
import {AlertService} from '../../shared/services/alert.service';
import {User} from '../../shared/models/user.model';
import { PasswordValidation } from '../helpers/password-validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
    form: FormGroup;
  emailPattern = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

  ngOnInit() {
          this.form = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email, Validators.pattern(this.emailPattern)], this.forbiddenEmails.bind(this)),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
            'confirmPassword': new FormControl(null, [Validators.required, PasswordValidation('password')]),
            'name': new FormControl(null, [Validators.required]),
            'agree': new FormControl(true, [Validators.requiredTrue])
          });
        }

    register() {
        const regData = {
          email: this.form.value.email,
          password: this.form.value.password,
          name: this.form.value.name
        };
        this.userService.addUser(regData)
            .subscribe(
                data => {
                    this.alertService.successReg('Registration successful');
                    this.router.navigate(['/auth/login']);
                },
              errorReg => {
                    this.alertService.errorReg(errorReg);

                });
    }
    // async validation email
  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.getUserByEmail(control.value)
        .subscribe((user: User) => {
          if (user) {
            resolve({forbiddenEmail: true});
          } else {
            resolve(null);
          }
        });
    });
  }

}
