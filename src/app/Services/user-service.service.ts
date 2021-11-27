import { UserResponse } from '../Model/user-response';
import { User } from './../Model/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  public getUsers(page:number): Observable<UserResponse>{
    return this.http.get<UserResponse>("https://reqres.in/api/users?page="+(page+1)).pipe(
      map((userResponse: UserResponse) => userResponse),
      catchError(err => throwError(err))
    )
  }

  public getUser(userId:number): Observable<any>{
    return this.http.get<any>("https://reqres.in/api/users/"+(userId)).pipe(
      map((user: any) => user),
      catchError(err => throwError(err))
    )
  }
}
