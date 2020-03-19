import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from './add-user.service';


declare var $: any;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  isEdit: boolean;
  user: User = new User();
  users: User[];
  searchOption: string;
  searchValue: string;

  @ViewChild('pmf', { static: false }) pmform: NgForm;
  constructor(private router: Router, private userService: UserService) {
    
  }

  createUser(): void {
    this.userService.createUser(this.user)
        .subscribe( data => {
          console.log("User created successfully.");
        });
    this.onReset();
    this.refresh();
  };

  updateUser(user:User): void {
    this.userService.updateUser(user)
        .subscribe( data => {
          console.log("User updated successfully.");
        });
    this.getUsers();
    this.isEdit=false;
      this.onReset();
      this.refresh();
  };

  getUser(user: User): void {

      this.isEdit = true;
      this.user.firstname=user.firstname;
      this.user.lastname=user.lastname;
      this.user.employeeid = user.employeeid;
      this.user.userid=user.userid; 
  };

  getFNSortedUser():void{
    this.userService.getSortedUsers("firstname")
      .subscribe( data => {
        this.users = data;
      });
  };
 
  getLNSortedUser():void{
    this.userService.getSortedUsers("lastname")
      .subscribe( data => {
        this.users = data;
      });
  };

  getEMPSortedUser():void{
    this.userService.getSortedUsers("employeeid")
      .subscribe( data => {
        this.users = data;
      });
  };

  getUsers():void{
    console.log("User detail reloaded");
    this.userService.getUsers()
      .subscribe( data => {
        this.users = data;
      });
  };

  ngOnInit() {
    this.searchOption="firstname";
    this.isEdit=false;
    this.userService.getUsers()
      .subscribe( data => {
        this.users = data;
      });
  };

  reload()
  {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/addUser']);
  }); 
  }

  deleteUser(user: User): void {

    this.userService.deleteUser(user)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      })
      this.getUsers();
      this.refresh();
  };

  onReset() {
    this.pmform.reset();
  }

  refresh(): void {
    window.location.reload();
  }

  searchUser() :void {
        this.userService.searchUser(this.searchOption, this.searchValue)
      .subscribe( data => {
        this.users = data;
        this.searchValue="";
    });
  }

    


}
