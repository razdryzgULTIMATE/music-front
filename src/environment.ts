import {HttpHeaders} from '@angular/common/http';

export const backendURL = "http://localhost:8080"
export const headers = new HttpHeaders({
  "Access-Control-Allow-Origin": "**",
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
  'Content-Type': 'application/json'
})
