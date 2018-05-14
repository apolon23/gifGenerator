import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth/guards/auth-guard.service';
import {GeneratorComponent} from './generator/generator.component';
import {HomeComponent} from './home/home.component';
import {MainComponent} from './main.component';
import {UploadGifComponent} from './upload-gif/upload-gif.component';
import {ImageSourceComponent} from './generator/image-source/image-source.component';
import {WebcamSourceComponent} from './generator/webcam-source/webcam-source.component';
import {VideoSourceComponent} from './generator/video-source/video-source.component';

const routes: Routes = [
  {path: '', component: MainComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'generator', component: GeneratorComponent, children: [
      {path: '', component: ImageSourceComponent},
      {path: 'webcam', component: WebcamSourceComponent},
      {path: 'video', component: VideoSourceComponent},
    ]},
    {path: 'upload-gif', component: UploadGifComponent}
  ]}

];
// canActivate: [AuthGuard] before children
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
