import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') registerForm: NgForm;

  constructor(private router: Router, private userService: UserService) { }

  username: String;
  password: String;
  reenter: String;
  profileURL: String;

  ngOnInit() {
  }

  register(event: any) {
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.reenter = this.registerForm.value.reenter;
    if (this.password === this.reenter) {
      const user = this.userService.findUserByCredentials(this.username, this.password);
      if (user) {
        alert('there is already an account with that information!');
      } else {
        this.userService.createUser(this.username, this.password);
        const newUser = this.userService.findUserByCredentials(this.username, this.password);
        if (newUser) {
          this.profileURL = '/user/' + newUser._id;
        }else {
          alert('something went wrong');
        }
      }
    }
  }
}
