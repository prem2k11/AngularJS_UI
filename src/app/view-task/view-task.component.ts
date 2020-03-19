import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project.model';
import { TaskService } from '../add-task/add-task.service';
import { ProjectService } from '../add-project/add-project.service';
import { DatePipe } from '@angular/common';
import { User } from '../models/user.model';
import { ParentTask } from '../models/parenttask.model';
import { ProjectTask } from '../models/projecttask.model';
import { Task } from '../models/task.model';
import { UserService } from '../add-user/add-user.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  disableBtn: boolean;
  projectSearch: string;
  projSearchValue: string;
  project: Project = new Project();
  projects: Project[];
  task: Task = new Task();
  tasks: Task[];
  projectTask: ProjectTask = new ProjectTask;
  projectTasks: ProjectTask[];
  parentTask: ParentTask = new ParentTask();

  constructor(private router: Router, private taskService: TaskService,
    private projectService: ProjectService, private userService: UserService) { }

  editRedirect(projTask: ProjectTask)
  {
    alert("Coming")
 /*    this.router.navigate(['addTask'], { 
      state: { ProjectTask: projTask} 
    }); */

    let navigationExtras: NavigationExtras = {
      queryParams: {
        "projectnm": this.project.projectnm,
        "projectid": this.project.projectid,
          "taskid": projTask.taskid,
          "taskname": projTask.taskname,
          "priority": projTask.priority,
          "parenttask": projTask.parentTaskEntity.parenttask,
          "parentid": projTask.parentTaskEntity.parentid,
          "startdate": projTask.startdate,
          "enddate": projTask.enddate,
          "userid": projTask.userEntity.userid,
          "userfname": projTask.userEntity.firstname,
          "userlname": projTask.userEntity.lastname,
          "empid":projTask.userEntity.employeeid,
          "status":projTask.status,
          "isEdit":false

      }
  };
  this.router.navigate(["addTask"], navigationExtras);
  }

  ngOnInit() {
    this.disableBtn=  false;
    this.projSearchValue = " No Record";
   /*  this.taskService.getTasks()
      .subscribe( data => {
        this.tasks = data;
      }); */
  }

  endTask(projTask: ProjectTask){
    this.task.taskid = projTask.taskid;
    this.taskService.endTask(this.task)
    .subscribe( data => {
      alert("Task Ended successfully.");
    });
    this.refresh();
  }

  updateUser(task:Task): void {
    this.taskService.updateTask(task)
        .subscribe( data => {
          console.log("Task updated successfully.");
        });
  };

  sortByPriority() {
    this.project.taskList = this.project.taskList.sort((a, b) => (a.priority > b.priority) ? 1 : -1);
  }

  sortByEndDate() {
    this.project.taskList = this.project.taskList.sort((a, b) => (a.enddate) > (b.enddate) ? 1 : -1);
  }

  sortByStartDate() {
    this.project.taskList = this.project.taskList.sort((a, b) => (a.startdate > b.startdate) ? 1 : -1);
  } 

  refresh(): void {
    window.location.reload();
  }

  searchProject() :void {
    this.projectService.searchProject(this.projectSearch)
  .subscribe( data => {
    if(!isNaN(data.length))
    {
      this.project = data[0];
      console.log(this.project);
      console.log(this.project.taskList);
      this.projectTasks = this.project.taskList;
      console.log(this.projectTasks);
      this.projSearchValue=this.project.projectnm;
    }
});

}
}
