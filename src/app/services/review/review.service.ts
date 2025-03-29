import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {backendURL, headers} from '../../../environment';
import {IReview, IReviewRequest} from '../../interfaces/IReview';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private http = inject(HttpClient)
  constructor() { }


  getAllReviewsByAlbumId(albumId: number){
    const url = backendURL + "//review/by-album/" + albumId;
    console.log(url)
    return this.http.get<IReview[]>(url);
  }
  createReview(rev: IReviewRequest){
    const url = backendURL + "/user/review"
    return this.http.post<IReview>(url, rev, {headers});
  }
  getReviewsByUsername(username: string) {
    const url = backendURL + "/review/by-user"
    return this.http.get<IReviewRequest[]>(url, {params: {username: username}})
  }
}
