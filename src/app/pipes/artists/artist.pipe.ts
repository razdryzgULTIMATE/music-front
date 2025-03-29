import { Pipe, PipeTransform } from '@angular/core';
import {IArtist} from '../../interfaces/IArtist';

@Pipe({
  standalone: true,
  name: 'artist'
})
export class ArtistPipe implements PipeTransform {

  transform(value: string) {
    return value + ", ";
  }

}
