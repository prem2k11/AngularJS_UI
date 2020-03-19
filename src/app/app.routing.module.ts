import { RouterModule, Routes } from '@angular/router';
import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import {AddUserComponent} from './add-user/add-user.component';

const routes: Routes = [
  { path: 'users', component: AddUserComponent },
  { path: 'add', component: AddUserComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }