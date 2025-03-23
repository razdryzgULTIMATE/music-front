import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {backendURL, headers} from '../../../environment';
import {TokenResponse} from '../../interfaces/tokenResponse';
import {tap} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  url = backendURL;
  token: string | null = null;
  refreshToken: string | null = null;
  constructor(private cookieService: CookieService) { }

  login(payload: {username: string, password: string}) {
    const u = this.url + "/login"
    return this.http.post<TokenResponse>(u, payload, {headers}).pipe(
      tap(t => {
        this.token = t.accessToken;
        this.refreshToken = t.refreshToken;
        this.cookieService.set("token", t.accessToken)
        this.cookieService.set("refreshToken", t.refreshToken)
      })
    )
  }
  registration(payload: {username: string, password: string}){
    const u = this.url + "/registration"
    console.log(u);
    return this.http.post(u, payload, {responseType: 'text'}).subscribe(x => console.log(x))
  }
  logout(){
    const u = this.url + "/logout"
    this.cookieService.deleteAll()
    this.http.get(u)
  }
  get isAuth(){
    if(!this.token){
      this.token = this.cookieService.get("token")
    }
    return !!this.token
  }

}
