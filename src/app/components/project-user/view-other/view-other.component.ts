import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonService} from '../../../services/project.user.service.client';
import {WorkoutService} from '../../../services/project.workout.service.client';

@Component({
  selector: 'app-view-other',
  templateUrl: './view-other.component.html',
  styleUrls: ['./view-other.component.css']
})
export class ViewOtherComponent implements OnInit {

  myuserId: String;
  myusername: String;
  mypassword: String;
  myname: String;
  myemail: String;
  myrole: String;
  myrating: number;
  myfollowedUsers: [{userId: String, name: String}];
  myfollowedByUsers: [{userId: String, name: String}];
  myfollowedDiets: [{}];
  myfollowedWorkouts: [{}];
  mygymMemberships: [{}];
  mystoreMemberships: [{}];
  theiruserId: String;
  username: String;
  password: String;
  name: String;
  email: String;
  role: String;
  rating: number;
  followedUsers: [{userId: String, name: String}];
  followedByUsers: [{userId: String, name: String}];
  followedDiets: [{}];
  followedWorkouts: [{}];
  gymMemberships: [{}];
  storeMemberships: [{}];

  constructor(private personService: PersonService, private activatedRoute: ActivatedRoute, private router: Router,
              private workoutService: WorkoutService) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.myuserId = params['uid'];
          this.theiruserId = params['oid'];
        });
    const user = this.personService.gePersonById(this.theiruserId).subscribe(
      (data: any) => {
        this.username = data.username;
        this.password = data.password;
        this.name = data.name;
        this.email = data.email;
        this.role = data.role;
        this.rating = data.rating;
        this.followedUsers = data.followedUsers;
        this.followedByUsers = data.followedByUsers;
        this.followedDiets = data.followedDiets;
        this.followedWorkouts = data.followedWorkouts;
        this.gymMemberships = data.gymMemberships;
        this.storeMemberships = data.storeMemberships;
      },
      (error: any) => {
      }
    );
  }

  follow() {
    this.personService.gePersonById(this.myuserId).subscribe(
      (data: any) => {
        this.myusername = data.username;
        this.mypassword = data.password;
        this.myname = data.name;
        this.myemail = data.email;
        this.myrole = data.role;
        this.myrating = data.rating;
        this.myfollowedUsers = data.followedUsers;
        this.myfollowedByUsers = data.followedByUsers;
        this.myfollowedDiets = data.followedDiets;
        this.myfollowedWorkouts = data.followedWorkouts;
        this.mygymMemberships = data.gymMemberships;
        this.mystoreMemberships = data.storeMemberships;
        if (this.myusername !== 'anonymous') {
          this.updateMe();
        }
      },
      (error: any) => {
      }
    );
  }

  updateMe() {
    this.myfollowedUsers.push({userId: this.theiruserId, name: this.name});
    this.personService.updateAccount(this.myuserId, this.myusername, this.myemail, this.mypassword, this.myname, this.myrole,
      this.myrating, this.myfollowedUsers, this.myfollowedByUsers, this.myfollowedDiets, this.myfollowedWorkouts,
      this.mygymMemberships, this.mystoreMemberships).subscribe(
      (data: any) => {
        this.updateThem();
      },
      (error: any) => {
      }
    );
  }

  updateThem() {
    this.followedByUsers.push({userId: this.myuserId, name: this.myname});
    this.personService.updateAccount(this.theiruserId, this.username, this.email, this.password, this.name, this.role,
      this.rating, this.followedUsers, this.followedByUsers, this.followedDiets, this.followedWorkouts,
      this.gymMemberships, this.storeMemberships).subscribe(
      (data: any) => {
        this.router.navigate(['/project', 'user', this.myuserId, 'other-user', this.theiruserId]);
      },
      (error: any) => {
      }
    );
  }


  unfollow() {
    this.personService.gePersonById(this.myuserId).subscribe(
      (data: any) => {
        this.myusername = data.username;
        this.mypassword = data.password;
        this.myname = data.name;
        this.myemail = data.email;
        this.myrole = data.role;
        this.myrating = data.rating;
        this.myfollowedUsers = data.followedUsers;
        this.myfollowedByUsers = data.followedByUsers;
        this.myfollowedDiets = data.followedDiets;
        this.myfollowedWorkouts = data.followedWorkouts;
        this.mygymMemberships = data.gymMemberships;
        this.mystoreMemberships = data.storeMemberships;
        if (this.myusername !== 'anonymous') {
          this.removeFromMine();
        }
      },
      (error: any) => {
      }
    );
  }

  removeFromMine() {
    for (let i = 0; i < this.myfollowedUsers.length; i++) {
      if (this.myfollowedUsers[i].userId === this.theiruserId ) {
        this.myfollowedUsers.splice(i, 1);
      }
    }

    this.personService.updateAccount(this.myuserId, this.myusername, this.myemail, this.mypassword, this.myname, this.myrole,
      this.myrating, this.myfollowedUsers, this.myfollowedByUsers, this.myfollowedDiets, this.myfollowedWorkouts,
      this.mygymMemberships, this.mystoreMemberships).subscribe(
      (data: any) => {
        this.removeFromThem();
      },
      (error: any) => {
      }
    );
  }

  removeFromThem() {
    for (let i = 0; i < this.followedByUsers.length; i++) {
      if (this.followedByUsers[i].userId === this.myuserId ) {
        this.followedByUsers.splice(i, 1);
      }
    }

    this.personService.updateAccount(this.theiruserId, this.username, this.email, this.password, this.name, this.role,
      this.rating, this.followedUsers, this.followedByUsers, this.followedDiets, this.followedWorkouts,
      this.gymMemberships, this.storeMemberships).subscribe(
      (data: any) => {
        alert('you no longer follow this person');
      },
      (error: any) => {
      }
    );
  }
}
