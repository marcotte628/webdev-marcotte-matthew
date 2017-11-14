import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {FoodService} from '../../../../services/project.food.service.client';
import {PersonService} from '../../../../services/project.user.service.client';

@Component({
  selector: 'app-gerneral-diets',
  templateUrl: './gerneral-diets.component.html',
  styleUrls: ['./gerneral-diets.component.css']
})
export class GerneralDietsComponent implements OnInit {
  @ViewChild('f') searchForm: NgForm;

  userId: String;
  username: String; email: String; password: String; name: String; role: String;
  rating: number; followedUsers: [String]; followedByUsers: [String]; followedDiets: [String];
  followedWorkouts: [String]; gymMemberships: [String]; storeMemberships: [String];
  foodName: String;
  foodType: String;
  allFoods;
  constructor(private router: Router, private foodService: FoodService,
              private activatedRoute: ActivatedRoute,  private accountService: PersonService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
        });
    this.foodService.getAllFoodPosts().subscribe(
      (data: any) => {
        this.allFoods = data;
      },
      (error: any) => {}
    );
  }

  searchFoodByName() {

    this.foodService.getFoodPostByName(this.foodName).subscribe(
      (data: any) => {
        this.allFoods = data;
      },
      (error: any) => {

      }
    );
  }

  addToProfile(id) {
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
        this.updateProfile(id);
      },
      (error: any) => {

      }
    );
  }

  updateProfile(id) {
    this.followedDiets.push(id);
    this.accountService.updateAccount(this.userId, this.username, this.email, this.password, this.name,
      this.role, this.rating, this.followedUsers, this.followedByUsers, this.followedDiets, this.followedWorkouts,
      this.gymMemberships, this.storeMemberships).subscribe(
      (data: any) => {
        alert('you added that item to your profile');
      }, (error: any) => {
      }
    );
  }

  searchFoodByType() {

    this.foodService.getFoodPostByType(this.foodType).subscribe(
      (data: any) => {
        this.allFoods = data;
      },
      (error: any) => {

      }
    );
  }

}
