import { Injectable } from '@angular/core';
import {backendURL} from '../../../environment';
import {IArtist} from '../../interfaces/IArtist';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {


  constructor(private http: HttpClient) { }

  getArtists(){
    const url = backendURL + "/artist/all";
    return this.http.get<Array<IArtist>>(url);

  }

}
