import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserPageComponent} from './user-page.component';
import {AuthGuard} from '../auth/guards/auth-guard.service';
import {ProfileComponent} from './profile/profile.component';
import {CreatedFilesComponent} from './created-files/created-files.component';

const routes: Routes = [
  {path: '', component: UserPageComponent, canActivate: [AuthGuard],  children: [
    {path: '', component: ProfileComponent},
    {path: 'created-files', component: CreatedFilesComponent}
  ]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPageRoutingModule {}
