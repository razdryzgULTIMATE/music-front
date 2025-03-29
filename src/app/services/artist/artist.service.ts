import { Injectable } from '@angular/core';
import {backendURL} from '../../../environment';
import {IArtistExtended} from '../../interfaces/IArtistExtended';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {


  constructor(private http: HttpClient) { }

  getArtists(){
    const url = backendURL + "/artist/all";
    return this.http.get<Array<IArtistExtended>>(url);

  }
  getArtistById(id: number) {
    const url = backendURL + "/artist/with-albums/" + id;
    console.log(url)
    return this.http.get<IArtistExtended>(url);
  }

}
