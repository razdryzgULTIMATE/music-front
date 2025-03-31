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
    console.log(url)
    return this.http.post<IReview>(url, rev, {headers});
  }
  updateReview(rev: IReviewRequest, id: number){
    const url = backendURL + "/user/review/" + id
    console.log(url)
    return this.http.put<IReview>(url, rev)
  }
  deleteReview(id: number){
    const url = backendURL + "/user/review/" + id
    console.log(url)
    this.http.delete(url)
  }
  getAll(){
    const url = backendURL + "/review/all"
    console.log(url)
    return this.http.get<IReview[]>(url);
  }
  getReviewsByUsername(username: string) {
    const url = backendURL + "/review/by-user"
    console.log(url)
    //- заменить IReviewRequest[] на IReview[]
    return this.http.get<IReviewRequest[]>(url, {params: {username: username}})
  }
}
