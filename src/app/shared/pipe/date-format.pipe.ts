import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value?: string, ...args: unknown[]): unknown {
    if (value) {
      return value.split('-').reverse().join('-');
    }
    return null
  }

}
