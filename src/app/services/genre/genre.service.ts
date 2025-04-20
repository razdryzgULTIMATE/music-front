import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IGenre} from '../../interfaces/IGenre';
import {backendURL} from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) { }
  createGenre(genre: IGenre){
    const url = backendURL + "/admin/genre"
    console.log(url)
    return this.http.post<IGenre>(url, genre);
  }
  updateGenre(genre:IGenre, id: number){
    const url = backendURL + "/admin/genre/" + id
    console.log(url)
    return this.http.put<IGenre>(url, genre)
  }
  deleteGenre(id: number){
    const url = backendURL + "/admin/genre/" + id
    console.log(url)
    return this.http.delete(url)
  }
  getAll(){
    const url = backendURL + "/genre/all"
    console.log(url)
    return this.http.get<IGenre[]>(url);
  }



}
