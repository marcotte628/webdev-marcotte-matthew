import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';

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
  password: String;
  phone: String;
  websites = [];

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

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
        this.last = data.lastName;
        this.password = data.password;
        this.phone = data.phone
        this.websites = data.websites;
      },
      (error: any) => {
      }
    );
  }

  updateUser() {
    this.userService.updateUser(this.userId, this.username, this.password, this.first,
      this.last, this.email, this.phone, this.websites).subscribe((data) => {
      this.username = data.username;
      this.email = data.email;
      this.first = data.firstName;
      this.last = data.lastName;
      this.password = data.password;
      this.phone = data.phone
      this.websites = data.websites;
      this.router.navigate(['/user/' + this.userId ]);
    } );
  }
}
