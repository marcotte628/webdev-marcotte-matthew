import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import {PersonService} from '../../../services/project.user.service.client';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-project-login',
  templateUrl: './project-login.component.html',
  styleUrls: ['./project-login.component.css']
})
export class ProjectLoginComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;


  username: String;
  password: String;
  name: String;
  errorFlag: boolean;
  errorMsg= 'Invalid username or password !';
  profileURL: String;
  disabledFlag: boolean;

  constructor(private router: Router,
              private personService: PersonService,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.disabledFlag = true;
  }

  login(event: any) {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.personService
      .login(this.username, this.password)
      .subscribe((user) => {
        this.sharedService.user = user;
        this.router.navigate(['/project/user']);
      });
  }

  /*
  searchUser() {
    this.userInfo = this.searchForm.value.user;
    this.personService.getPersonByUsername(this.userInfo).subscribe(
      (data: any) => {
        this.users = data;
        this.username = data.username;
        this.name = data.name;
        this.role = data.role;
      },
      (error: any) => {

      }
    );
  }

*/
}
