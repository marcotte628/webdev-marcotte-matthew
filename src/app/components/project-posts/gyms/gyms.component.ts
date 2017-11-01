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
    console.log('you entered ==========> ');
    console.log('gyms = ' +  this.gymInfo);
    this.gymService.getGymByName(this.gymInfo).subscribe(
      (data: any) => {
        this.gyms = data;
      },
      (error: any) => {

      }
    );
    console.log('you got back  ==========> ');
    console.log( this.gyms);
  }

}
