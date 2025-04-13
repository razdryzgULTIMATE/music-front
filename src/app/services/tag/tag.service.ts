import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ITag} from '../../interfaces/ITag';
import {backendURL} from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }
  private url = backendURL + "/tag/"
  createTag(tag: ITag, albumId: number){
    const url = backendURL + "/tag";
    console.log(url)
    return this.http.post<ITag>(url, tag, {params: {albumId: albumId}})
  }
  updateTag(tag: ITag, id: number){
    const url = this.url + id;
    console.log(url)
    return this.http.put<ITag>(url, tag)
  }
  deleteTag(id: number){
    const url = this.url + id;
    console.log(url)
    return this.http.delete(url);
  }
  getAll(){
    const url = this.url + "all"
    console.log(url)
    return this.http.get<ITag[]>(url, );
  }
}
