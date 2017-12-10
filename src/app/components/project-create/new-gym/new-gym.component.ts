import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonService} from "../../../services/project.user.service.client";
import {GymService} from "../../../services/project.gym.service.client";

@Component({
  selector: 'app-new-gym',
  templateUrl: './new-gym.component.html',
  styleUrls: ['./new-gym.component.css']
})
export class NewGymComponent implements OnInit {

  address: String;
  gymName: String;
  type: String;
  userId: String;
  username: String;
  password: String;
  name: String;
  email: String;
  role: String;
  rating: number;
  followedUsers: [{}];
  followedByUsers: [{}];
  followedDiets: [{}];
  followedWorkouts: [{}];
  gymMemberships: [{}];
  storeMemberships: [{}];
  gymId: String;
  constructor(private activatedRoute: ActivatedRoute, private personService: PersonService,
              private gymService: GymService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
        });
  }

  submit() {
    this.gymService.createGym(this.gymName, this.type, this.address).subscribe(
      (data: any) => {
        this.gymId = data._id;
        this.getProfileInfo();
      }, (error: any) => {
      }
    );
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
        if (this.username !== 'anonymous') {
          this.updateProfile();
        }
      },
      (error: any) => {
      }
    );
  }
  updateProfile() {
    this.gymMemberships.push({gymId: this.gymId, name: this.gymName});
    this.personService.updateAccount(this.userId, this.username, this.email, this.password, this.name, this.role,
      this.rating, this.followedUsers, this.followedByUsers, this.followedDiets, this.followedWorkouts,
      this.gymMemberships, this.storeMemberships).subscribe(
      (data: any) => {
        this.router.navigate(['/project/user']);
      },
      (error: any) => {
      }
    );
  }

}
