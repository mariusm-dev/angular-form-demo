import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRequest, UserResponse } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private httpClient: HttpClient) { }

    saveUser(user: UserRequest): Observable<UserResponse> {
        return this.httpClient.post<UserResponse>(`users`, user);
    }
}
