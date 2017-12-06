import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';
import { Router } from '@angular/router';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') registerForm: NgForm;

  constructor(private router: Router, private userService: UserService, private sharedService: SharedService) { }

  username: String;
  password: String;
  reenter: String;
  userId: String;
  profileURL: String;
  registerInfoNotValid: boolean;
  invalidMessage: String;

  ngOnInit() {
    this.registerInfoNotValid = false;
    this.invalidMessage = '';
  }

  register(event: any) {
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.reenter = this.registerForm.value.reenter;

    if (! this.username || ! this.password || ! this.reenter) {
      this.invalidMessage = 'please enter username, password, and reenter the password';
      this.registerInfoNotValid = true;
    } else if ( this.password !== this.reenter) {
      this.invalidMessage = 'please make sure the passwords match';

      this.registerInfoNotValid = true;
    } else {
      this.userService.register(this.username, this.password).subscribe(
        (data: any) => {
          this.sharedService.user = data;
          this.router.navigate(['/user']);
        },
        (error: any) => {
        }
      );
    }
  }
}
