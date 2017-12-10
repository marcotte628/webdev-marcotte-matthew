import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GymService} from '../../../services/project.gym.service.client';
import {PersonService} from '../../../services/project.user.service.client';
@Component({
  selector: 'app-gym-post',
  templateUrl: './gym-post.component.html',
  styleUrls: ['./gym-post.component.css']
})
export class GymPostComponent implements OnInit {
  userId: String;
  username: String;
  password: String;
  name: String;
  email: String;
  role: String;
  rating: number;
  followedUsers: [{}];
  followedByUsers: [{}];
  followedDiets: [{}];
  followedWorkouts: [{}];
  gymMemberships: [{gymId: String, name: String}];
  storeMemberships: [{}];
  gymId: String;
  gymData;
  constructor(private activatedRoute: ActivatedRoute, private gymService: GymService,
              private accountService: PersonService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.gymId = params['gid'];
        });
    this.gymService.getGymById(this.gymId).subscribe(
      (data: any) => {
        this.gymData = data;
      }, (error: any) => {
      }
    );
  }

  follow() {
    this.accountService.gePersonById(this.userId).subscribe(
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
        if (this.username !== 'anonymous') {
          this.addToProfile();
        }
      },
      (error: any) => {
      }
    );
  }

  addToProfile() {
    this.gymMemberships.push({gymId: this.gymId, name: this.gymData.name});
    this.accountService.updateAccount(this.userId, this.username, this.email, this.password, this.name, this.role,
      this.rating, this.followedUsers, this.followedByUsers, this.followedDiets, this.followedWorkouts,
      this.gymMemberships, this.storeMemberships).subscribe(
      (data: any) => {
        alert('you now follow this store');
      },
      (error: any) => {
      }
    );
  }

  unfollow() {this.accountService.gePersonById(this.userId).subscribe(
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
      this.removeFromProfile();
    },
    (error: any) => {
    }
  );
  }

  removeFromProfile() {
    for (let i = 0; i < this.gymMemberships.length; i++) {
      if (this.gymMemberships[i].gymId === this.gymId ) {
        this.gymMemberships.splice(i, 1);
      }
    }

    this.accountService.updateAccount(this.userId, this.username, this.email, this.password, this.name, this.role,
      this.rating, this.followedUsers, this.followedByUsers, this.followedDiets, this.followedWorkouts,
      this.gymMemberships, this.storeMemberships).subscribe(
      (data: any) => {
        alert('you no longer follow this gym');
      },
      (error: any) => {
      }
    );
  }
}
