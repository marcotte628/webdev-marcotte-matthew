import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkoutService} from '../../../../services/project.workout.service.client';
import {PersonService} from '../../../../services/project.user.service.client';

@Component({
  selector: 'app-general-workouts',
  templateUrl: './general-workouts.component.html',
  styleUrls: ['./general-workouts.component.css']
})
export class GeneralWorkoutsComponent implements OnInit {
  @ViewChild('f') searchForm: NgForm;

  userId: String;
  username: String; email: String; password: String; name: String; role: String;
  rating: number; followedUsers: [{}]; followedByUsers: [{}]; followedDiets: [{}];
  followedWorkouts: [{}]; gymMemberships: [{}]; storeMemberships: [{}];
  workoutName: String;
  workoutType: String;
  allWorkouts;
  difficulty: number;
  constructor(private router: Router, private workoutService: WorkoutService,
              private activatedRoute: ActivatedRoute, private accountService: PersonService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
        });
    this.workoutService.getAllWorkouts().subscribe(
      (data: any) => {
        this.allWorkouts = data;
      },
      (error: any) => {}
    );
  }

  searchWorkoutByName() {

    this.workoutService.getWorkoutByName(this.workoutName).subscribe(
      (data: any) => {
        this.allWorkouts = data;
      },
      (error: any) => {

      }
    );
  }

  searchWorkoutByType() {

    this.workoutService.getWorkoutByType(this.workoutType).subscribe(
      (data: any) => {
        this.allWorkouts = data;
      },
      (error: any) => {

      }
    );
  }

  addToProfile(id, wktname) {
    this.accountService.gePersonById(this.userId).subscribe(
      (data: any) => {
        this.username = data.username;
        this.email = data.email;
        this.password = data.password;
        this.name = data.name;
        this.role = data.role;
        this.rating = data.rating;
        this.followedUsers = data.followedUsers;
        this.followedByUsers = data.followedByUsers;
        this.followedDiets = data.followedDiets;
        this.followedWorkouts = data.followedWorkouts;
        this.gymMemberships = data.gymMemberships;
        this.storeMemberships = data.storeMemberships;
        this.updateProfile(id, wktname);
      },
      (error: any) => {

    }
    );
  }

  updateProfile(id, wktname) {
    this.followedWorkouts.push({workoutId: id, name: wktname} );
    this.accountService.updateAccount(this.userId, this.username, this.email, this.password, this.name,
      this.role, this.rating, this.followedUsers, this.followedByUsers, this.followedDiets, this.followedWorkouts,
      this.gymMemberships, this.storeMemberships).subscribe(
      (data: any) => {
        alert('you added that item to your profile');
      }, (error: any) => {
      }
    );
  }

}
