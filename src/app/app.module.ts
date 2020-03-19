import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import {MDBBootstrapModule} from 'angular-bootstrap-md'; 
import { Routes, RouterModule, Router, NavigationStart } from "@angular/router";
import { AppComponent } from './app.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app.routing.module';
import {UserService} from './add-user/add-user.service';
import {ProjectService} from './add-project/add-project.service';
import {TaskService} from './add-task/add-task.service';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes=[

  {path: 'addProject', component: AddProjectComponent},
  {path: 'addTask', component: AddTaskComponent},
  {path: 'addUser', component: AddUserComponent},
  {path: 'viewTask', component: ViewTaskComponent}

];
@NgModule({
  declarations: [
    AppComponent,
    AddProjectComponent,
    AddTaskComponent,
    AddUserComponent,
    ViewTaskComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService,ProjectService,TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
