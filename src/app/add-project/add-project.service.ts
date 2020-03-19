import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Project } from '../models/project.model';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application-json'})
}

@Injectable()
export class ProjectService{

    constructor(private http:HttpClient) {}
    private projectUrl = '/project-service';
    private userUrl = '/user-service';
    
    public getProjects() {
      return this.http.get<Project[]>(this.projectUrl +"/project/getallproject");
    }

    public getSortedProjects(sortname: string) {
      return this.http.get<Project[]>(this.projectUrl +"/project/getallsortedproject?sortname="+sortname);
    }

    public getProject(project) {
        return this.http.get<Project>(this.projectUrl +"/project/getproject?id="+ project.projectid);
      }
  
    public deleteProject(project) {
      return this.http.delete(this.projectUrl +"/project/deleteproject?id="+ project.projectid);
    }

  
    public createProject(project) {
      return this.http.post<Project>(this.projectUrl + "/project/addproject", project);
    }

    public updateProject(project) {
      return this.http.post<Project>(this.projectUrl + "/project/updateproject", project);
    }

    public searchProject(searchValue) {
      return this.http.get<Project[]>(this.projectUrl +"/project/searchproject?value="+searchValue);
    }

}