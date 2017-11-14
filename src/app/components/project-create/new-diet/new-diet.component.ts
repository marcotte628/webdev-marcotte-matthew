import {  Component, OnInit, ViewChild  } from '@angular/core';
import {PersonService} from '../../../services/project.user.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {FoodService} from '../../../services/project.food.service.client';


@Component({
  selector: 'app-new-diet',
  templateUrl: './new-diet.component.html',
  styleUrls: ['./new-diet.component.css']
})
export class NewDietComponent implements OnInit {
  @ViewChild('f') foodForm: NgForm;
  userId: String;
  type: String;
  image: String;
  foodName: String;
  foodType: String;

  foodId: String;
  foodImage: String;
  protein: String;
  carbs: String;
  fats: String;

  newFood;
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

  constructor(private activatedRoute: ActivatedRoute,
              private  personService: PersonService,
              private foodService: FoodService,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
        });
  }

  getAPIid() {
    this.foodName = this.foodForm.value.foodName;
    this.foodType = this.foodForm.value.type;
    this.foodImage = this.foodForm.value.image;
    this.foodService.getFoodApiId(this.foodName).subscribe(
      (data: any) => {
        this.foodId = data._id;
        this.getNutritionInfo();
      },
      (error: any) => {
      }
    );
  }

  getNutritionInfo() {
    this.foodService.getFoodInformation(this.foodId).subscribe(
      (ret: any) => {
        this.protein = ret[0].value;
        this.carbs = ret[1].value;
        this.fats = ret[2].value;
        this.addFoodToDB();
      },
      (error: any) => {
      }
    );
  }

  addFoodToDB() {
    const body = {
      name: this.foodName, type: this.foodType, userId: this.userId,
      protein: this.protein, carbs: this.carbs, fats: this.fats, image: this.foodImage
    };
    this.foodService.createFoodPost(body).subscribe(
      (data: any) => {
        this.newFood = data;
        this.getProfileInfo();
      },
      (error: any) => {
      });
  }

  getProfileInfo() {
    this.personService.gePersonById(this.userId).subscribe(
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
        this.addToProfile();
      },
      (error: any) => {
      }
    );
  }
  addToProfile() {
    this.followedDiets.push(this.newFood._id);
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
