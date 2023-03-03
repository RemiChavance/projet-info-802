import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hours'
})
export class HoursPipe implements PipeTransform {

  transform(value: number | null): string | null {
    if (value == null) return value;
    
    let before = value.toString().split('.')[0];
    let after = (parseInt(value.toString().split('.')[1]) * 60).toString();

    if (after.length > 2) {
      after = after.slice(0, 2);
    }

    return `${before} H ${after}`;
  }
}
