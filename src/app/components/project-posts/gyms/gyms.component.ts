import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import {GymService} from '../../../services/project.gym.service.client';

@Component({
  selector: 'app-gyms',
  templateUrl: './gyms.component.html',
  styleUrls: ['./gyms.component.css']
})
export class GymsComponent implements OnInit {
  @ViewChild('f') searchForm: NgForm;
  gymInfo: String;
  gyms;

  constructor(private router: Router, private gymService: GymService) { }

  ngOnInit() {
  }

  searchGym() {
    this.gymInfo = this.searchForm.value.gym;
    this.gymService.getGymByName(this.gymInfo).subscribe(
      (data: any) => {
        this.gyms = data;
      },
      (error: any) => {

      }
    );
    console.log('data ==========> ');
    console.log('gyms = ' +  this.gyms);
  }

}
