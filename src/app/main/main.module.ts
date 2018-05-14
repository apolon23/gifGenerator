import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {GeneratorModule} from './generator/generator.module';
import {HomeModule} from './home/home.module';
import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import { UploadGifComponent } from './upload-gif/upload-gif.component';
import {AvatarModule} from 'ngx-avatar';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    MainRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    GeneratorModule,
    HomeModule,
    AvatarModule
  ],
  declarations: [
    MainComponent,
    UploadGifComponent
  ],
  exports: [ReactiveFormsModule, FormsModule]
})
export class MainModule {}
