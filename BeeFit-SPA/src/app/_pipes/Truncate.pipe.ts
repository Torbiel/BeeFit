import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit = 46, completeWords = false, ellipsis = '...') {
    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }
    return value.length > limit ? value.substr(0, limit) + ellipsis : value;
  }

}
