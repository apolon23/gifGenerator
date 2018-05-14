import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HomeComponent} from './home.component';
import { SearchComponent } from './search/search.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {GifModule} from '../../shared/components/gif/gif.module';
import { RouterModule } from '@angular/router';
import {NgMasonryGridModule} from 'ng-masonry-grid';
import { DashboardComponent } from './dashboard/dashboard.component';
import {PaginationModule} from '../../shared/pipes/pagination.module';
import {ResultComponent} from './search/result/result.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    GifModule,
    RouterModule,
    NgMasonryGridModule,
    PaginationModule
  ],
  declarations: [
    HomeComponent,
    SearchComponent,
    DashboardComponent,
    ResultComponent
  ],
  exports: [ReactiveFormsModule, FormsModule]
})
export class HomeModule {}
