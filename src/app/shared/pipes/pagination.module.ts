import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationPipe } from './pagination.pipe';

@NgModule({
  declarations: [
    PaginationPipe
  ],
  imports: [
    CommonModule,
  ],
  providers: [],
  exports: [PaginationPipe]
})

export class PaginationModule {}
