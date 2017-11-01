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
  name: String;
  type: String;
  difficulty: number;
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
        this.name = data.name;
        this.type = data.type;
        this.difficulty = data.difficulty;
      },
      (error: any) => {

      }
    );
    // display results below search button...
    // clicking on a result will navigate to details page that shows more information
  }

}
