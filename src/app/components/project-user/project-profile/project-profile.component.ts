import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonService} from '../../../services/project.user.service.client';
import {WorkoutService} from '../../../services/project.workout.service.client';

@Component({
  selector: 'app-project-profile',
  templateUrl: './project-profile.component.html',
  styleUrls: ['./project-profile.component.css']
})
export class ProjectProfileComponent implements OnInit {

  userId: String;
  username: String;
  password: String;
  name: String;
  email: String;
  role: String;
  rating: number;
  followedUsers: [String];
  followedByUsers: [String];
  followedDiets: [String];
  followedWorkouts: [String];
  gymMemberships: [String];
  storeMemberships: [String];
  workoutData = [];

  constructor(private personService: PersonService, private activatedRoute: ActivatedRoute, private router: Router,
              private workoutService: WorkoutService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
        });
    const user = this.personService.gePersonById(this.userId).subscribe(
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

  updateUser() {
    this.personService.updateAccount(this.userId, this.username, this.email, this.password, this.name, this.role,
      this.rating, this.followedUsers, this.followedByUsers, this.followedDiets, this.followedWorkouts,
      this.gymMemberships, this.storeMemberships).subscribe(
      (data: any) => {
        this.router.navigate(['/project/user/' + this.userId]);
      },
      (error: any) => {
      }
    );
  }

}
