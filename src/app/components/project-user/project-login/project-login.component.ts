import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import {PersonService} from '../../../services/project.user.service.client';

@Component({
  selector: 'app-project-login',
  templateUrl: './project-login.component.html',
  styleUrls: ['./project-login.component.css']
})
export class ProjectLoginComponent implements OnInit {
  @ViewChild('f') searchForm: NgForm;

  userInfo: String;
  users;


  constructor(private router: Router,
              private personService: PersonService) { }

  ngOnInit() {
  }


  searchUser() {
    this.userInfo = this.searchForm.value.user;
    console.log('you entered ==========> ');
    console.log('user = ' +  this.userInfo);
    this.personService.getPersonByUsername(this.userInfo).subscribe(
      (data: any) => {
        this.users = data;
      },
      (error: any) => {

      }
    );
    console.log('data returned ==========> ');
    console.log(this.users);
  }

}
