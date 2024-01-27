import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nidDate',
  standalone: true,
})
export class NidDatePipePipe implements PipeTransform {
  transform(value: string, date: string = 'FullDate'): string {
    const year =
      Number(value.slice(1, 2)) < 24
        ? 1900 + Number(value.slice(1, 3))
        : 2000 + Number(value.slice(1, 3));
    const month = Number(value.slice(3, 5));
    const day = Number(value.slice(5, 7));
    const bd = new Date(year, month - 1, day);
    if (value.length == 14) {
      switch (date) {
        case 'FullDate':
          return bd.toLocaleString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          });
        case 'YY':
          return year.toString();
        case 'MM':
          return month.toString();
        case 'DD':
          return day.toString();
        default:
          return value;
      }
    } else {
      return '';
    }
  }
}
