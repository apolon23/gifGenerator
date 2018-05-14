import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {AdminAuthGuard} from './guards/admin-auth-guard.service';
import {ManageUsersComponent} from './manage-users/manage-users.component';
import {ManagePageComponent} from './manage-page/manage-page.component';


const routes: Routes = [
  {path: '', component: AdminComponent, canActivate: [AdminAuthGuard], data: {expectedRole: 'true'},   children: [
    {path: '', component: ManageUsersComponent},
    {path: 'manage-page', component: ManagePageComponent},
  ]}

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
