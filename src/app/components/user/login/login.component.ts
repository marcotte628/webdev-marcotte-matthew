import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';

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
  profileURL: String;
  userService: UserService;
  errorFlag: boolean;
  errorMsg= 'Invalid username or password !';

  title: string; // see usage as string interpolation (data flows from .ts to HTML template)
  disabledFlag: boolean; // see usage as property binding (binds to various properties of HTML component)
  inputTxt: string; // see usage as two-way data binding (data flows to and from .ts code to HTML template)

  constructor() { }

  ngOnInit() {
    this.title = 'Login';
    this.disabledFlag = true;
  }

  // binding click event
  login(event: any) {
    // fetch data from loginForm
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
  }

}