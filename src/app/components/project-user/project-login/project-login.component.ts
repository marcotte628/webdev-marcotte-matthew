import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import {PersonService} from '../../../services/project.user.service.client';
import {GymService} from '../../../services/project.gym.service.client';
import {WorkoutService} from '../../../services/project.workout.service.client';
import {StoreService} from '../../../services/project.store.service.client';
import {FoodService} from '../../../services/project.food.service.client';

@Component({
  selector: 'app-project-login',
  templateUrl: './project-login.component.html',
  styleUrls: ['./project-login.component.css']
})
export class ProjectLoginComponent implements OnInit {
  @ViewChild('f') searchForm: NgForm;

  userInfo: String;
  workoutInfo: String;
  foodInfo: String;
  gymInfo: String;
  storeInfo: String;

  users;
  workouts;
  foods;
  gyms;
  stores;

  constructor(private router: Router,
              private personService: PersonService) { }

  ngOnInit() {
  }


  searchUser() {
    this.userInfo = this.searchForm.value.user;
    this.personService.getPersonByUsername(this.userInfo).subscribe(
      (data: any) => {
        this.users = data;
      },
      (error: any) => {

      }
    );
    console.log('data ==========> ');
    console.log('user = ' +  this.users);
  }

}
