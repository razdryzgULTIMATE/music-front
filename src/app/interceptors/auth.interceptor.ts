import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {catchError, map, Observable} from 'rxjs';
import {TokenResponse} from '../interfaces/tokenResponse';

let isRefreshing = false

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const token = authService.accessToken
  if(!token) return next(req);
  if(isRefreshing){
    return refreshAndProceed(authService, req, next)
  }


  const nr = addToken(req, token)
  return next(nr)
    .pipe(
      catchError(err => {
        if(err.status === 403){
          return refreshAndProceed(authService, req, next)
        }
        return err
      })
    ) as Observable<HttpEvent<any>>;
}

const refreshAndProceed = (authService: AuthService, req: HttpRequest<any>, next: HttpHandlerFn) => {
  if(!isRefreshing) {
    isRefreshing = true
    return authService.refreshAuthToken().pipe(
      map((res) => {
        isRefreshing = false
        return next(addToken(req, res.accessToken))
      }),
      catchError(err => {
        authService.logout()
        return err
      })
    ) as Observable<HttpEvent<any>>
  }
  return next(addToken(req, authService.accessToken))

}

const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone(
    {
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}
