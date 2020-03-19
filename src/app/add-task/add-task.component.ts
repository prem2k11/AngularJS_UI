import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Project } from '../models/project.model';
import { TaskService } from './add-task.service';
import { ProjectService } from '../add-project/add-project.service';
import { DatePipe } from '@angular/common';
import { User } from '../models/user.model';
import { ParentTask } from '../models/parenttask.model';
import { ProjectTask } from '../models/projecttask.model';
import { Task } from '../models/task.model';
import { UserService } from '../add-user/add-user.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers: [DatePipe]
})
export class AddTaskComponent implements OnInit{

  projSearchValue: string;
  parentSearchValue: string;
  userSearchValue: string;
  userDetail: string;
  enableDate: boolean;
  parentcheckslt: boolean;
  dateType: string;
  isEdit: boolean;
  project: Project = new Project();
  projects: Project[];
  parenttask: ParentTask = new ParentTask();
  ptasks: ProjectTask[];
  task: Task = new Task();
  tasks: Task[];
  user: User = new User();
  searchOption: string;
  projectSearch: string;
  parentSearch: string;
  userSearch: string;

  @ViewChild('pmtf', { static: false }) pmform: NgForm;
  constructor(private router: Router, private taskService: TaskService,
    private projectService: ProjectService, private userService: UserService,
    private datePipe: DatePipe, private route: ActivatedRoute) {

      console.log(this.route.queryParams);
      this.route.queryParams.subscribe(params => {
        this.projectSearch = params["projectnm"];
        this.userSearch = params["userfname"];
        this.parentSearch = params["parenttask"];
        this.project.projectnm = params["projectnm"];
        this.project.projectid = params["projectid"];
      this.task.taskid = params["taskid"];
      this.task.taskname = params["taskname"];
      this.task.priority = params["priority"];
      this.task.startdate = params["startdate"];
      this.task.enddate = params["enddate"];
      this.parenttask.parentid = params["parentid"];
      this.parenttask.parenttask = params["parenttask"];
      this.user.firstname = params["userfname"];
      this.user.lastname = params["userlname"];
      this.user.userid = params["userid"];
      this.user.employeeid = params["empid"];
      this.task.parentid = params["parentid"];
      this.task.status = params["status"];
      this.task.userid = params["userid"];
      this.task.projectid = params["projectid"];
      this.projSearchValue= params["projectnm"];
      this.parentSearchValue= params["parenttask"];
      this.userSearchValue= params["userfname"];
      this.isEdit= params["isEdit"];
      alert(this.isEdit);
    });
     }

  ngOnInit(): void {
    this.projSearchValue = " No Record";
    this.parentSearchValue = " No Record";
    this.userSearchValue= " No Record";
    this.parentcheckslt = false;
    this.searchOption="firstname";
    this.taskService.getTasks()
      .subscribe( data => {
        this.tasks = data;
      });
  }

  setDates() {
    this.enableDate = !this.enableDate;
    if (this.enableDate) {
      this.task.startdate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.task.enddate = this.datePipe.transform(new Date().setDate(new Date().getDate() + 1), 'yyyy-MM-dd');
      this.dateType = 'date';
    } else {
      this.task.startdate = '';
      this.task.enddate = '';
      this.dateType = 'text';
    }
  }
  createParentTask()
  {
    this.taskService.addParent(this.task)
    .subscribe( data => {
      console.log("Parent Task created successfully.");
    });
    
    this.onReset();
  }
  createTask(): void {
    alert(this.parenttask.parentid);
    alert(this.project.projectid);
    alert(this.user.userid);
    this.task.parentid = this.parenttask.parentid;
    this.task.projectid= this.project.projectid;
    this.task.userid = this.user.userid;
    this.taskService.createTask(this.task)
        .subscribe( data => {
          console.log("Task created successfully.");
        });
        
    this.onReset();
  };

  updateTask(task:Task): void {
    this.taskService.updateTask(task)
        .subscribe( data => {
          console.log("Task updated successfully.");
        });
    this.isEdit=false;
    
      this.onReset();
  };

  onReset() {
    this.pmform.reset();
    this.dateType = 'text';
    this.userDetail ='';
    this.parentcheckslt = false;
  }

  searchProject() :void {

        this.projectService.searchProject(this.projectSearch)
      .subscribe( data => {
        if(!isNaN(data.length))
        {
          this.project = data[0];
          this.projSearchValue=this.project.projectnm;
        }
    });

  }

  searchParent() :void {
    alert(this.parentSearch);
      this.taskService.getParentTask(this.parentSearch)
    .subscribe( data => {
        this.parenttask = data;
        alert(this.parenttask.parentid);
        alert(this.parenttask.parenttask);
        this.parentSearchValue=this.parenttask.parenttask;
      
    });

  }

  searchUser() :void {
        this.userService.searchUser(this.searchOption, this.userSearch)
      .subscribe( data => {
        if(!isNaN(data.length))
        {
          this.user=  data[0];
          this.project.user=this.user;
          this.userSearch = this.user.firstname.concat(this.user.lastname);
          this.userDetail = this.userSearch;
          this.userSearchValue = this.user.firstname.concat(this.user.lastname);
        }
        else
        {
          this.userDetail = "No Record Found";
        }
        
      });
  }

  hideDetail()
  {
    this.parentcheckslt= true;
  }

}
