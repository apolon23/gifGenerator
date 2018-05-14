import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthGuard} from '../auth/guards/auth-guard.service';
import {UserPageComponent} from './user-page.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {UserPageRoutingModule} from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import {AvatarModule} from 'ngx-avatar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ShowHidePasswordModule} from 'ngx-show-hide-password';
import { CreatedFilesComponent } from './created-files/created-files.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    UserPageRoutingModule,
    AvatarModule,
    NgbModule,
    ShowHidePasswordModule.forRoot()
  ],
  declarations: [
    UserPageComponent,
    HeaderNavComponent,
    SidebarComponent,
    ProfileComponent,
    CreatedFilesComponent
  ],
  providers: [
    AuthGuard
  ],
  exports: [ReactiveFormsModule, FormsModule]
})
export class UserPageModule {}
