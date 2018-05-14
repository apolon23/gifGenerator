import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {MainComponent} from './main/main.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
  {path: 'user', loadChildren: './user-page/user-page.module#UserPageModule'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})

export class AppRoutingModule {}
