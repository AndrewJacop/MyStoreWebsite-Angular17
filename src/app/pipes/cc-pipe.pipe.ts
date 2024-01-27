import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ccPipe',
  standalone: true,
})
export class CcPipePipe implements PipeTransform {
  transform(value: string): string {
    if (value.length == 16) {
      const result = value.match(/.{1,4}/g) ?? [];
      return result.join('-');
    } else {
      return '';
    }
  }
}
