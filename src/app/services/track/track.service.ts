import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ITrack} from '../../interfaces/ITrack';
import {backendURL} from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(private http: HttpClient) { }

  createTrack(track: ITrack){
    const url = backendURL + "/admin/track"
    console.log(url)
    return this.http.post<ITrack>(url, track);
  }
  updateTrack(track: ITrack, id: number){
    const url = backendURL + "/admin/track/" + id
    console.log(url)
    return this.http.put<ITrack>(url, track)
  }
  getAll(){
    const url = backendURL + "/track"
    console.log(url)
    return this.http.get<ITrack[]>(url)
  }
  deleteTrack(id: number){
    const url = backendURL + "/admin/track/" + id
    console.log(url)
    return this.http.delete(url);
  }


}
