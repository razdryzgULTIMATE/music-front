import {inject, Injectable} from '@angular/core';
import {backendURL} from '../../../environment';
import {HttpClient} from '@angular/common/http';
import {IAlbum} from '../../interfaces/IAlbum';
import {ReviewService} from '../review/review.service';
import {forkJoin} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private http = inject(HttpClient)
  private reviewService = inject(ReviewService)
  constructor() { }
  getAlbumById(id: number){
    const url = backendURL + "/album/" + id;
    return this.http.get<IAlbum>(url)
  }
}
