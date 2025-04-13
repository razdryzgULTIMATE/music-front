import {Injectable} from '@angular/core';
import {backendURL} from '../../../environment';
import {IArtistExtended} from '../../interfaces/IArtistExtended';
import {HttpClient} from '@angular/common/http';
import {IArtist} from '../../interfaces/IArtist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {


  constructor(private http: HttpClient) {
  }

  createArtist(artist: IArtist) {
    const url = backendURL + "/admin/artist"
    console.log(url)
    return this.http.post<IArtist>(url, artist)
  }

  updateArtist(artist: IArtist, id: number) {
    const url = backendURL + "/admin/artist/" + id
    console.log(url)
    return this.http.put<IArtist>(url, artist)
  }

  getArtists() {
    const url = backendURL + "/artist/all";
    console.log(url)
    return this.http.get<Array<IArtistExtended>>(url);
  }

  getArtistById(id: number) {
    const url = backendURL + "/artist/with-albums/" + id;
    console.log(url)
    return this.http.get<IArtistExtended>(url);
  }

  deleteArtist(id: number) {
    const url = backendURL + "/admin/artist/" + id;
    console.log(url)
    return this.http.delete(url)
  }
}
