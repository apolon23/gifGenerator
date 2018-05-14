import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { GifComponent } from './gif.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    GifComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgbModule.forRoot()
  ],
  exports: [
    GifComponent
  ]
})
export class GifModule  { }
