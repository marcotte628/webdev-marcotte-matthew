import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WorkoutService} from '../../../services/project.workout.service.client';
import {PersonService} from '../../../services/project.user.service.client';

@Component({
  selector: 'app-workout-post',
  templateUrl: './workout-post.component.html',
  styleUrls: ['./workout-post.component.css']
})
export class WorkoutPostComponent implements OnInit {

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
  followedWorkouts: [{workoutId: String, name: String}];
  gymMemberships: [{}];
  storeMemberships: [{}];
  workoutId: String;
  workoutData;
  otherId: String;
  otherName: String
  constructor(private activatedRoute: ActivatedRoute, private workoutService: WorkoutService,
              private accountService: PersonService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.workoutId = params['wid'];
        });

    // get workout info to display on html
    this.workoutService.getWorkoutById(this.workoutId).subscribe(
      (data: any) => {
        this.workoutData = data;
        this.otherId = this.workoutData.userId;
        this.getOtherUser();
      },
      (error: any) => {
      }
    );
  }

  getOtherUser() {
    this.accountService.gePersonById(this.otherId).subscribe(
      (data: any) => {
        this.otherName = data.name;
      },
      (error: any) => {
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
    console.log(this.userId);
    this.followedWorkouts.push({workoutId: this.workoutId, name: this.workoutData.name});
    this.accountService.updateAccount(this.userId, this.username, this.email, this.password, this.name, this.role,
      this.rating, this.followedUsers, this.followedByUsers, this.followedDiets, this.followedWorkouts,
      this.gymMemberships, this.storeMemberships).subscribe(
      (data: any) => {
        alert('you now follow this gym');
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
    for (let i = 0; i < this.followedWorkouts.length; i++) {
      if (this.followedWorkouts[i].workoutId === this.workoutId ) {
        this.followedWorkouts.splice(i, 1);
      }
    }

    this.accountService.updateAccount(this.userId, this.username, this.email, this.password, this.name, this.role,
      this.rating, this.followedUsers, this.followedByUsers, this.followedDiets, this.followedWorkouts,
      this.gymMemberships, this.storeMemberships).subscribe(
      (data: any) => {
        alert('you no longer follow this workout');
      },
      (error: any) => {
      }
    );
  }

}
