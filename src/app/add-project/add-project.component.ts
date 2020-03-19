import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Project } from '../models/project.model';
import { ProjectService } from './add-project.service';
import { UserService } from '../add-user/add-user.service';
import { DatePipe } from '@angular/common';
import { User } from '../models/user.model';
import { ParentTask } from '../models/parenttask.model';
import { ProjectTask } from '../models/projecttask.model';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  providers: [DatePipe]
})
export class AddProjectComponent implements OnInit {

  projSearchValue: string;
  managerDetail: string;
  enableDate: boolean;
  dateType: string;
  isEdit: boolean;
  project: Project = new Project();
  projects: Project[];
  parenttask: ParentTask;
  tasks: ProjectTask[];
  user: User = new User();
  searchOption: string;
  searchValue: string;
  @ViewChild('pmpf', { static: false }) pmform: NgForm;
  constructor(private router: Router, private projectService: ProjectService,
    private userService: UserService,
    private datePipe: DatePipe) { }

  setDates() {
    this.enableDate = !this.enableDate;
    if (this.enableDate) {
      this.project.startdate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.project.enddate = this.datePipe.transform(new Date().setDate(new Date().getDate() + 1), 'yyyy-MM-dd');
      this.dateType = 'date';
    } else {
      this.project.startdate = '';
      this.project.enddate = '';
      this.dateType = 'text';
    }
  }

  createProject(): void {
    this.projectService.createProject(this.project)
        .subscribe( data => {
          console.log("Project created successfully.");
        });
    this.getProjects();
    this.onReset();
    this.refresh();
  };

  updateProject(project:Project): void {
    alert("Entering update");
    this.projectService.updateProject(project)
        .subscribe( data => {
          console.log("Project updated successfully.");
        });
    this.getProjects();
    this.isEdit=false;
      this.onReset();
      this.refresh();
  };

  getProject(project: Project): void {

      this.isEdit = true;
      this.project.projectid=project.projectid;
      this.project.projectnm=project.projectnm;
      this.project.startdate = this.datePipe.transform(project.startdate, 'yyyy-MM-dd');
      this.project.enddate = this.datePipe.transform(project.enddate, 'yyyy-MM-dd');
      this.project.priority = project.priority;
      this.project.nofCompTask = project.nofCompTask;
      this.project.noOfTask = project.noOfTask;
      this.project.user=project.user; 
      this.project.taskList=project.taskList;
      this.getUserDetail();
      this.searchValue= this.user.firstname.concat(this.user.lastname);
      this.managerDetail = this.searchValue;
  };

  getSDsortedProject():void{
    this.projectService.getSortedProjects("startdate")
      .subscribe( data => {
        this.projects = data;
      });
  };
 
  getEDSortedProject():void{
    this.projectService.getSortedProjects("enddate")
      .subscribe( data => {
        this.projects = data;
      });
  };

  getPrPSortedProject():void{
    this.projectService.getSortedProjects("priority")
      .subscribe( data => {
        this.projects = data;
      });
  };

  getCompSortedProject():void{
    this.projectService.getSortedProjects("completed")
      .subscribe( data => {
        this.projects = data;
      });
  };

  getProjects():void{
    console.log("Project detail reloaded");
    this.projectService.getProjects()
      .subscribe( data => {
        this.projects = data;
      });
  };

  ngOnInit() {
    this.searchOption="firstname";
    this.isEdit=false;
    this.projectService.getProjects()
      .subscribe( data => {
        this.projects = data;
      });
  };

  reload()
  {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/addProject']);
  }); 
  }

  deleteProject(project: Project): void {

    this.projectService.deleteProject(project)
      .subscribe( data => {
        this.projects = this.projects.filter(u => u !== project);
      })
      this.getProjects();
      this.refresh();
  };

  onReset() {
    this.pmform.reset();
    this.dateType = 'text';
    this.managerDetail ='';
  }

  refresh(): void {
    window.location.reload();
  }
  searchProject() :void {
      alert(this.projSearchValue);
        this.projectService.searchProject(this.projSearchValue)
      .subscribe( data => {
        this.projects = data;
        this.projSearchValue="";
    });
  }

  searchUser() :void {

      this.userService.searchUser(this.searchOption, this.searchValue)
    .subscribe( data => {
      if(!isNaN(data.length))
      {
        this.user=  data[0];
        this.project.user=this.user;
        this.searchValue = this.user.firstname.concat(this.user.lastname);
        this.managerDetail = this.searchValue;
      }
      else
      {
        this.managerDetail = "No Record Found";
      }
      
    });
  

  }

  sortByPriority() {
    this.projects = this.projects.sort((a, b) => (a.priority > b.priority) ? 1 : -1);
  }

  sortByCompletedTasks() {
    this.projects = this.projects.sort((a, b) => (a.noOfTask > b.noOfTask) ? 1 : -1);
  }

  sortByEndDate() {
    this.projects = this.projects.sort((a, b) => (a.enddate) > (b.enddate) ? 1 : -1);
  }

  sortByStartDate() {
    this.projects = this.projects.sort((a, b) => (a.startdate > b.startdate) ? 1 : -1);
  } 

  getUserDetail():void{
    alert("User Detail"+this.project.user.userid);
    this.userService.getUser(this.project.user.userid)
      .subscribe( data => {
        this.user = data;
        this.searchValue = this.user.firstname.concat(this.user.lastname);
      });
  };
}
