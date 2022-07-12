import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customSlice',
})
export class CustomSlicePipe implements PipeTransform {
  transform(value: any, args: number): any {
    if (value.length > args) {
      return value.slice(0, args) + '...';
    }
    if (value.length <= args) {
      return value;
    }
  }
}
