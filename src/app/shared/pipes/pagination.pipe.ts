import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(value: any, pageSize: number, page: number): any {
    const firstElem = page > 1 ? page * (pageSize - 1) : 0;
    return value.slice(firstElem, firstElem + pageSize) ;
  }
}
