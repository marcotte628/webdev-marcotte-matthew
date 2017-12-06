import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';
import { Router } from '@angular/router';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  // properties
  username: String;
  password: String;
  userId: String;
  profileURL: String;
  errorFlag: boolean;
  errorMsg= 'Invalid username or password !';
  toggle: String;
  loginInfoNotValid: boolean;

  title: string; // see usage as string interpolation (data flows from .ts to HTML template)
  disabledFlag: boolean; // see usage as property binding (binds to various properties of HTML component)
  inputTxt: string; // see usage as two-way data binding (data flows to and from .ts code to HTML template)

  constructor(private router: Router, private userService: UserService, private sharedService: SharedService) { }

  ngOnInit() {
    this.title = 'Login';
    this.disabledFlag = true;
    this.loginInfoNotValid = false;
  }

  // binding click event
  login(event: any) {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;

    if (! this.username || ! this.password ) {
      this.loginInfoNotValid = true;
    } else {
      this.userService
        .login(this.username, this.password)
        .subscribe((user) => {
          this.sharedService.user = user;
          this.router.navigate(['/user']);
        });
    }

  }
}
