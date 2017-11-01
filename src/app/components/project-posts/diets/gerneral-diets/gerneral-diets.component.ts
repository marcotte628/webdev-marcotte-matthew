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

  foodInfo: String;
  foods;

  constructor(private router: Router, private foodService: FoodService ) { }

  ngOnInit() {
  }

  searchFood() {
    this.foodInfo = this.searchForm.value.food;
    this.foodService.getFoodPostByName(this.foodInfo).subscribe(
      (data: any) => {
        this.foods = data;
      },
      (error: any) => {

      }
    );
    console.log('data ==========> ');
    console.log('food = ' +  this.foods);
  }
}
