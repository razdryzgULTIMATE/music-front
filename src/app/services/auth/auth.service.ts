import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {backendURL, headers} from '../../../environment';
import {TokenResponse} from '../../interfaces/tokenResponse';
import {catchError, Observable, tap} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  url = backendURL;
  token: string | null = null;
  // refreshToken: string | null = null;
  constructor(private cookieService: CookieService) { }

  login(payload: {username: string, password: string}) {
    const u = this.url + "/login"
    return this.http.post<TokenResponse>(u, payload, {headers}).pipe(
      tap(t => {
        this.token = t.accessToken;
        // this.refreshToken = t.refreshToken;
        this.saveTokens(t);
      })
    )
  }
  private saveTokens(t: TokenResponse){
    this.cookieService.set("token", t.accessToken)
    this.cookieService.set("refreshToken", t.refreshToken)
  }
  registration(payload: {username: string, password: string}){
    const u = this.url + "/registration"
    console.log(u);
    return this.http.post(u, payload, {responseType: 'text'}).subscribe(x => console.log(x))
  }
  logout(){
    const u = this.url + "/logout"
    localStorage.removeItem("username")
    this.cookieService.deleteAll()
    this.http.get(u)
  }
  get isAuth(){
    return !!this.cookieService.get("token")
  }
  get accessToken(){
    return this.cookieService.get("token")
  }
  get role(){
    const jwt = this.cookieService.get("token")
    const decoded: any = jwtDecode(jwt);
    // console.log(decoded)
    return decoded.role
  }

  refreshAuthToken() {
    const u = this.url + "/refresh-token"
    const body = {refreshToken: this.cookieService.get("refreshToken")}
    return this.http.post<TokenResponse>(u, body).pipe(
      tap(t => {
        this.saveTokens(t)
      })

    )

  }
  get refreshToken(){
    return this.cookieService.get("refreshToken")
  }


}
