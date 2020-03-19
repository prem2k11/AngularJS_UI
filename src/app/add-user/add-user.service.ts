import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/user.model';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application-json'})
}

@Injectable()
export class UserService{

    constructor(private http:HttpClient) {}
    private userUrl = '/user-service';
    
    public getUsers() {
      return this.http.get<User[]>(this.userUrl +"/users/getalluser");
    }

    public getSortedUsers(sortname: string) {
      return this.http.get<User[]>(this.userUrl +"/users/getallsorteduser?sortname="+sortname);
    }

    public getUser(userid: any) {
        return this.http.get<User>(this.userUrl +"/users/getuser?id="+ userid);
      }
  
    public deleteUser(user) {
      return this.http.delete(this.userUrl +"/users/deleteuser?id="+ user.userid);
    }
  
    public createUser(user) {
      return this.http.post<User>(this.userUrl + "/users/adduser", user);
    }

    public updateUser(user) {
      return this.http.post<User>(this.userUrl + "/users/updateuser", user);
    }

    public searchUser(searchOption, searchValue) {
      return this.http.get<User[]>(this.userUrl +"/users/searchuser?searchby="+searchOption+"&value="+searchValue);
    }
}