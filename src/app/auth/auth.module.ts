import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {AlertComponent} from './directives/alert.component';
import {RegisterComponent} from './register/register.component';
import {AuthRoutingModule} from './auth-routing.module';
import { ResetComponent } from './reset/reset.component';
import {ShowHidePasswordModule} from 'ngx-show-hide-password';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    AlertComponent,
    ResetComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ShowHidePasswordModule.forRoot()
  ],
  exports: [ReactiveFormsModule, FormsModule]
})

export class AuthModule {}
