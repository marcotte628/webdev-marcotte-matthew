import {  Component, OnInit, ViewChild  } from '@angular/core';
import {PersonService} from '../../../services/project.user.service.client';
import {ActivatedRoute} from '@angular/router';
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
  foodName: String;
  foodType: String;
  foodId: String;
  foodInfo: {};
  foodTitle: String;
  protein: String;
  carbs: String;
  fats: String;

  constructor(private activatedRoute: ActivatedRoute,
              private  personService: PersonService,
              private foodService: FoodService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
        });
  }

  createFood() {
    this.foodName = this.foodForm.value.name;
    this.foodType = this.foodForm.value.type;
    this.foodService.getFoodApiId(this.foodName).subscribe(
      (data: any) => {
        this.foodId = data._id;
      },
      (error: any) => {
      }
    );
    this.foodService.getFoodInformation(this.foodId).subscribe(
      (ret: any) => {
        this.foodInfo = ret.report.foods[0].nutrients;
        const title = ret.report.foods[0].name;
        const pro = ret.report.foods[0].nutrients[0].value;
        const carb =  ret.report.foods[0].nutrients[2].value;
        const fat =  ret.report.foods[0].nutrients[1].value;

        this.foodTitle = JSON.stringify(title).replace(/\"/g, '');
        this.protein = JSON.stringify(pro).replace(/\"/g, '');
        this.carbs = JSON.stringify(carb).replace(/\"/g, '');
        this.fats =  JSON.stringify(fat).replace(/\"/g, '');

      },
      (error: any) => {
      }
    );
    const body = {_id: '', name: this.foodName, type: this.foodType, userId: this.userId,
                  protein: this.protein, carbs: this.carbs, fats: this.fats };
    this.foodService.createFoodPost(body).subscribe(
      (data: any) => {
        console.log('data from supposed post to server = ' + JSON.stringify(data).replace(/\"/g, ''));
      },
      (error: any) => {
      });
  }

}
