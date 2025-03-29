import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'stars'
})
export class StarsPipe implements PipeTransform {

  transform(value: number): unknown {
    const maxRating: number = 5;
    let str: string;
    str = "★".repeat(value);
    str += "☆".repeat(maxRating - value);
    return str;
  }

}
