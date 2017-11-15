import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {GymService} from '../../../services/project.gym.service.client';
import {PersonService} from "../../../services/project.user.service.client";

@Component({
  selector: 'app-gyms',
  templateUrl: './gyms.component.html',
  styleUrls: ['./gyms.component.css']
})
export class GymsComponent implements OnInit {
  @ViewChild('f') searchForm: NgForm;

  userId: String;
  username: String; email: String; password: String; name: String; role: String;
  rating: number; followedUsers: [{}]; followedByUsers: [{}]; followedDiets: [{}];
  followedWorkouts: [{}]; gymMemberships: [{}]; storeMemberships: [{}];
  allGyms;
  gymName: String;
  gymType: String;

  constructor(private router: Router, private gymService: GymService,
              private activatedRoute: ActivatedRoute,  private accountService: PersonService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
        });
    this.gymService.getAllGyms().subscribe(
      (data: any) => {
        this.allGyms = data;
      },
      (error: any) => {

      }
    );
  }

  searchGymByName() {
    this.gymName = this.searchForm.value.name;
    this.gymService.getGymByName(this.gymName).subscribe(
      (data: any) => {
        this.allGyms = data;
      },
      (error: any) => {

      }
    );
  }

  searchGymByType() {
    this.gymType = this.searchForm.value.type;
    this.gymService.getGymByName(this.gymType).subscribe(
      (data: any) => {
        this.allGyms = data;
      },
      (error: any) => {

      }
    );

  }


  addToProfile(id, fn) {
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
        this.updateProfile(id, fn);
      },
      (error: any) => {

      }
    );
  }

  updateProfile(id, gn) {
    this.gymMemberships.push({gymId: id, name: gn} );
    this.accountService.updateAccount(this.userId, this.username, this.email, this.password, this.name,
      this.role, this.rating, this.followedUsers, this.followedByUsers, this.followedDiets, this.followedWorkouts,
      this.gymMemberships, this.storeMemberships).subscribe(
      (data: any) => {
        alert('you added that gym to your profile');
      }, (error: any) => {
      }
    );
  }

}
