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
  workoutId: String;
  workoutData;
  username: String;
  otherId: String;
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
        this.getUser();
      },
      (error: any) => {
      }
    );
  }

  getUser() {
    this.accountService.gePersonById(this.otherId).subscribe(
      (data: any) => {
        this.username = data.name;
      },
      (error: any) => {
      }
    );
  }

}
