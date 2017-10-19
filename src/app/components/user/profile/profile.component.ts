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
  username: String;
  email: String;
  first: String;
  last: String;


  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
        });
    const user = this.userService.findUserById(this.userId).subscribe(
      (data: any) => {
        this.username = data.username;
        this.email = data.email;
        this.first = data.firstName;
        this.last = data.lastName; },
      (error: any) => {
      }
    );
  }

}
