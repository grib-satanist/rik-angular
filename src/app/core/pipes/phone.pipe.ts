import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'phone',
    standalone: true
})
export class PhonePipe implements PipeTransform {
  transform(value: number): string {
    const p = '+' + value;
    return `${p.slice(0,2)}(${p.slice(2,5)}) ${p.slice(5,8)}-${p.slice(8,10)}-${p.slice(10,12)}`;
  }
}
