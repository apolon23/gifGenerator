import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminComponent} from './admin.component';
import {RouterModule} from '@angular/router';
import {AdminRoutingModule} from './admin-routing.module';
import {MessagesComponent} from '../shared/components/messages/messages.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {AdminAuthGuard} from './guards/admin-auth-guard.service';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ManagePageComponent } from './manage-page/manage-page.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AdminRoutingModule,
    NgbModule
  ],
  declarations: [
    AdminComponent,
    MessagesComponent,
    HeaderNavComponent,
    SidebarComponent,
    ManageUsersComponent,
    ManagePageComponent
  ],
  providers: [
    AdminAuthGuard
  ],
  exports: [ReactiveFormsModule, FormsModule]
})
export class AdminModule {}
