import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneratorComponent } from './generator.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SortablejsModule } from 'angular-sortablejs';
import { ImageSourceComponent } from './image-source/image-source.component';
import { GifRedactorComponent } from './gif-redactor/gif-redactor.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularDraggableModule } from 'angular2-draggable';
import { ColorPickerModule } from 'ngx-color-picker';
import {GeneratorService} from '../../shared/services/generator.service';
import {FileDropModule} from 'ngx-file-drop';
import { WebcamSourceComponent } from './webcam-source/webcam-source.component';
import { RouterModule } from '@angular/router';
import { VideoSourceComponent } from './video-source/video-source.component';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import {PaginationModule} from '../../shared/pipes/pagination.module';

@NgModule({
  declarations: [
    GeneratorComponent,
    ImageSourceComponent,
    GifRedactorComponent,
    WebcamSourceComponent,
    VideoSourceComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule.forRoot(),
    AngularDraggableModule,
    SortablejsModule.forRoot({ animation: 150 }),
    ColorPickerModule,
    FileDropModule,
    IonRangeSliderModule,
    PaginationModule
  ],
  providers: [
    GeneratorService
  ],
  exports: [ReactiveFormsModule, FormsModule]
})

export class GeneratorModule {}
