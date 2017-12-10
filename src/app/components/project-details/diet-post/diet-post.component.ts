import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FoodService} from '../../../services/project.food.service.client';
import {PersonService} from '../../../services/project.user.service.client';

@Component({
  selector: 'app-diet-post',
  templateUrl: './diet-post.component.html',
  styleUrls: ['./diet-post.component.css']
})
export class DietPostComponent implements OnInit {

  foodId: String;
  userId: String;
  username: String;
  password: String;
  name: String;
  email: String;
  role: String;
  rating: number;
  followedUsers: [{}];
  followedByUsers: [{}];
  followedDiets: [{name: String, foodId: String}];
  followedWorkouts: [{}];
  gymMemberships: [{}];
  storeMemberships: [{}];
  foodData;
  otherId: String;
  otherName: String;

  constructor(private activatedRoute: ActivatedRoute, private foodService: FoodService,
              private accountService: PersonService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid']
          this.foodId = params['fid'];
        }
      );
    this.foodService.getFoodPostById(this.foodId).subscribe( (data: any) => {
        this.foodData = data;
        this.otherId = this.foodData.userId;
        this.getUser();
      },
      (error: any) => {
      }
    );
  }

  getUser() {
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
    this.followedDiets.push({foodId: this.foodId, name: this.foodData.name});
    this.accountService.updateAccount(this.userId, this.username, this.email, this.password, this.name, this.role,
      this.rating, this.followedUsers, this.followedByUsers, this.followedDiets, this.followedWorkouts,
      this.gymMemberships, this.storeMemberships).subscribe(
      (data: any) => {
        alert('you now follow this food');
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
    for (let i = 0; i < this.followedDiets.length; i++) {
      if (this.followedDiets[i].foodId === this.foodId ) {
        this.followedDiets.splice(i, 1);
      }
    }
    this.accountService.updateAccount(this.userId, this.username, this.email, this.password, this.name, this.role,
      this.rating, this.followedUsers, this.followedByUsers, this.followedDiets, this.followedWorkouts,
      this.gymMemberships, this.storeMemberships).subscribe(
      (data: any) => {
        alert('you no longer follow this food');
      },
      (error: any) => {
      }
    );
  }

}
