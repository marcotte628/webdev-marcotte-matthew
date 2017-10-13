import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId: String;
  user = {};
  username: String;
  email: String;
  first: String;
  last: String;
  websiteURL: String;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
        });
    this.user = this.userService.findUserById(this.userId);
    this.username = this.user['username'];
    this.email =  this.user['email'];
    this.first = this.user['firstName'];
    this.last = this.user['lastName'];
    this.websiteURL = '/user/' + this.userId + '/website';
  }

}
