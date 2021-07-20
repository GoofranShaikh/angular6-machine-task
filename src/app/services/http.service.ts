import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FormSchema } from '../interfaces/form-schema';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }


  getProfile():Observable<FormSchema>{
    return this.http.get<FormSchema>(`${env.BASE_URL}/Register/`)
  }
  getUserProfile(id:number):Observable<FormSchema>{
    return this.http.get<FormSchema>(`${env.BASE_URL}/Register/${id}`)
  }



  postProfile(profileData:FormSchema):Observable<FormSchema>{
    return this.http.post<FormSchema>(`${env.BASE_URL}/Register`,profileData)
  }


  editProfilePhoto(id:number,image:FormSchema):Observable<FormSchema>{
   
 
let headers = new HttpHeaders()
 
headers=headers.append('content-type','application/json')
//headers=headers.append('Access-Control-Allow-Origin', '*')
//headers=headers.append('content-type','application/x-www-form-urlencoded')
//headers=headers.append('content-type','charset=utf-8')
 
console.log(headers)
 
   return this.http.put<FormSchema>(`${env.BASE_URL}/Register/${id}`,image,{ 'headers': headers });
  
  }
}
