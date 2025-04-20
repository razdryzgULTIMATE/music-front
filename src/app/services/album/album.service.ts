import {inject, Injectable} from '@angular/core';
import {backendURL} from '../../../environment';
import {HttpClient} from '@angular/common/http';
import {IAlbum} from '../../interfaces/IAlbum';
import {ReviewService} from '../review/review.service';
import {forkJoin} from 'rxjs';
import {IAlbumRequest} from '../../interfaces/IAlbumRequest';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private http = inject(HttpClient)
  private reviewService = inject(ReviewService)
  constructor() { }

  createAlbum(album: IAlbumRequest){
    const url = backendURL + "/admin/album"
    console.log(url)
    return this.http.post<IAlbum>(url, album);
  }
  updateAlbum(album: IAlbumRequest, id: number){
    const url = backendURL + "/admin/album/" + id;
    console.log(url)
    return this.http.put<IAlbum>(url, album);
  }
  deleteAlbum(id: number){
    const url = backendURL + "/admin/album/" + id;
    console.log(url)
    return this.http.delete(url);
  }
  getAll(){
    const url = backendURL + "/album/all"
    console.log(url)
    return this.http.get<IAlbum[]>(url);
  }
  getAlbumById(id: number){
    const url = backendURL + "/album/" + id;
    console.log(url)
    return this.http.get<IAlbum>(url)
  }
}
