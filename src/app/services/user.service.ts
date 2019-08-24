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
}
