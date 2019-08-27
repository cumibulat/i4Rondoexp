import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUsers(page: number){
    return this.httpClient.get("https://reqres.in/api/users?page=" + page)
      .pipe(delay(1000));  
  }

  getUserDetail(id: number){
    return this.httpClient.get("https://reqres.in/api/users/" + id)
      .pipe(delay(1000));  
  }

  createUser(formData: any){
    return this.httpClient.post("https://reqres.in/api/users/", formData)
      .pipe(delay(1000));  
  }

  updateUser(id:number, formData: any){
    return this.httpClient.put("https://reqres.in/api/users/" + id, formData)
      .pipe(delay(1000));  
  }

}
