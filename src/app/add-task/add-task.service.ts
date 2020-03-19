import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../models/task.model';
import { ParentTask } from '../models/parenttask.model';


const httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application-json'})
}

@Injectable()
export class TaskService{

    constructor(private http:HttpClient) {}
    private taskUrl = '/task-service';
    
    public getTasks() {
      return this.http.get<Task[]>(this.taskUrl +"/task/getAllTasks");
    }

    public getTask(task) {
        return this.http.get<Task>(this.taskUrl +"/task/getTask?id="+ task.taskid);
      }
  
    public endTask(task) {
      return this.http.put(this.taskUrl +"/task/endTask?id="+ task.taskid,"");
    }
  
    public createTask(task) {
      return this.http.post<Task>(this.taskUrl + "/task/addTask", task);
    }

    public addParent(task) {
      return this.http.post<Task>(this.taskUrl + "/task/addParent", task);
    }

    public getAllParent() {
      return this.http.get<ParentTask[]>(this.taskUrl +"/task/getAllParent");
    }

    public getParentTask(ptaskname: string) {
        return this.http.get<ParentTask>(this.taskUrl +"/task/getParentTask?name="+ ptaskname);
      }

    public updateTask(task) {
        return this.http.post(this.taskUrl +"/task/updateTask",task);
      }
}