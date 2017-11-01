import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import {FoodService} from '../../../../services/project.food.service.client';

@Component({
  selector: 'app-gerneral-diets',
  templateUrl: './gerneral-diets.component.html',
  styleUrls: ['./gerneral-diets.component.css']
})
export class GerneralDietsComponent implements OnInit {
  @ViewChild('f') searchForm: NgForm;

  foodName: String;
  foodType: String;
  foodsByName;
  foodsById;

  constructor(private router: Router, private foodService: FoodService ) { }

  ngOnInit() {
  }

  search() {
    this.foodName = this.searchForm.value.name;
    this.foodType = this.searchForm.value.type;

    console.log('you entered ==========> ');
    console.log('name = ' + this.foodName);
    console.log('name = ' + this.foodType);
    if (this.foodName && this.foodType) {
      this.searchFoodByName();
      this.searchFoodByType();
     }else if (this.foodName ) {
      this.searchFoodByName();
    } else if (this.foodType) {
      console.log('search by type');
      this.searchFoodByType();
    }
  }

  searchFoodByName() {
    this.foodService.getFoodPostByName(this.foodName).subscribe(
      (data: any) => {
        this.foodsByName = data;
      },
      (error: any) => {

      }
    );
    console.log('you got back  ==========> ');
    console.log(this.foodsByName);
  }

  searchFoodByType() {
    console.log('bout to search');
    this.foodService.getFoodPostByType(this.foodType).subscribe(
      (data: any) => {
        this.foodsById = data;
      },
      (error: any) => {

      }
    );
    console.log('you got back  ==========> ');
    console.log(this.foodsById);
  }
}
