import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonService} from '../../../services/project.user.service.client';
import {WorkoutService} from '../../../services/project.workout.service.client';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-project-profile',
  templateUrl: './project-profile.component.html',
  styleUrls: ['./project-profile.component.css']
})
export class ProjectProfileComponent implements OnInit {

  user;
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
  gymMemberships: [{}];
  storeMemberships: [{}];
  workoutData = [];

  constructor(private personService: PersonService, private activatedRoute: ActivatedRoute, private router: Router,
              private workoutService: WorkoutService, private sharedService: SharedService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.user = this.sharedService.user || {};
        });
    this.username = this.user.username;
    this.password = this.user.password;
    this.name = this.user.name;
    this.email = this.user.email;
    this.role = this.user.role;
    this.rating = this.user.rating;
    this.followedUsers = this.user.followedUsers;
    this.followedByUsers = this.user.followedByUsers;
    this.followedDiets = this.user.followedDiets;
    this.followedWorkouts = this.user.followedWorkouts;
    this.gymMemberships = this.user.gymMemberships;
    this.storeMemberships = this.user.storeMemberships;
    this.personService.getPersonByUsername(this.userId).subscribe(
      (data: any) => {
        this.userId = data._id;
      },
      (error: any) => {
      }
    );
  }

  logout() {
    this.personService.logout()
      .subscribe((status) => {
        this.router.navigate(['/login']);
      });
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


