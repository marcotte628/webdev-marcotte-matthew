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
  userId: String;
  profileURL: String;

  ngOnInit() {
  }

  register(event: any) {
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.reenter = this.registerForm.value.reenter;
    if (this.password === this.reenter) {
      this.userService.createUser(this.username, this.password).subscribe(
        (data: any) => {
          this.router.navigate(['/user/' + data._id]);
        },
        (error: any) => {
        }
      );
    }
  }
}
