import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import {PersonService} from '../../../services/project.user.service.client';

@Component({
  selector: 'app-project-register',
  templateUrl: './project-register.component.html',
  styleUrls: ['./project-register.component.css']
})
export class ProjectRegisterComponent implements OnInit {

  @ViewChild('f') registerForm: NgForm;

  constructor(private router: Router, private personService: PersonService) { }

  username: String;
  password: String;
  reenter: String;
  userId: String;
  profileURL: String;
  role: String;
  name: String;

  ngOnInit() {
  }

  register(event: any) {
    this.username = this.registerForm.value.username;
    this.name = this.registerForm.value.name;
    this.password = this.registerForm.value.password;
    this.reenter = this.registerForm.value.reenter;
    this.role = this.registerForm.value.role;
    if (this.password === this.reenter) {
      this.personService.createAccount(this.username, this.password, this.name, this.role).subscribe(
        (data: any) => {
          this.router.navigate(['/project/user/' + data._id]);
        },
        (error: any) => {
        }
      );
    }
  }

}
