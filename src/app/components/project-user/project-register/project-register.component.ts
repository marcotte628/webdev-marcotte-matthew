import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import {PersonService} from '../../../services/project.user.service.client';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-project-register',
  templateUrl: './project-register.component.html',
  styleUrls: ['./project-register.component.css']
})
export class ProjectRegisterComponent implements OnInit {

  @ViewChild('f') registerForm: NgForm;

  constructor(private router: Router, private personService: PersonService,
              private sharedService: SharedService) { }

  username: String;
  password: String;
  reenter: String;
  userId: String;
  profileURL: String;
  role: String;
  name: String;

  ngOnInit() {
  }

  register() {
    this.username = this.registerForm.value.username;
    this.name = this.registerForm.value.name;
    this.password = this.registerForm.value.password;
    this.reenter = this.registerForm.value.reenter;
    this.role = this.registerForm.value.role;
    if (this.password === this.reenter) {
      this.personService.register(this.username, this.password).subscribe(
        (data: any) => {
          this.sharedService.user = data;
          this.router.navigate(['/project/user']);
        },
        (error: any) => {
        }
      );
    }
  }

}
