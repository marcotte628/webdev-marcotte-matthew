import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import {WorkoutService} from '../../../../services/project.workout.service.client';

@Component({
  selector: 'app-general-workouts',
  templateUrl: './general-workouts.component.html',
  styleUrls: ['./general-workouts.component.css']
})
export class GeneralWorkoutsComponent implements OnInit {
  @ViewChild('f') searchForm: NgForm;

  workoutInfo: String;
  workouts;
  constructor(private router: Router, private workoutService: WorkoutService) { }

  ngOnInit() {
  }

  searchWorkout() {
    this.workoutInfo = this.searchForm.value.workout;
    console.log('you entered ==========> ');
    console.log('workout = ' +  this.workoutInfo);
    this.workoutService.getWorkoutByName(this.workoutInfo).subscribe(
      (data: any) => {
        this.workouts = data;
      },
      (error: any) => {

      }
    );
    console.log('you got back  ==========> ');
    console.log(this.workouts);
  }

}
