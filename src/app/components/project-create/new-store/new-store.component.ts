import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonService} from "../../../services/project.user.service.client";
import {StoreService} from "../../../services/project.store.service.client";

@Component({
  selector: 'app-new-store',
  templateUrl: './new-store.component.html',
  styleUrls: ['./new-store.component.css']
})
export class NewStoreComponent implements OnInit {

  address: String;
  name: String;
  type: String;
  userId: String;
  username: String;
  password: String;
  storeName: String;
  email: String;
  role: String;
  rating: number;
  followedUsers: [{}];
  followedByUsers: [{}];
  followedDiets: [{}];
  followedWorkouts: [{}];
  gymMemberships: [{}];
  storeMemberships: [{}];
  storeId: String;
  constructor(private activatedRoute: ActivatedRoute, private personService: PersonService,
              private storeService: StoreService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
        });
  }

  submit() {
    this.storeService.createStore(this.storeName, this.type, this.address).subscribe(
      (data: any) => {
        this.storeId = data._id;
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
        this.updateProfile();
      },
      (error: any) => {
      }
    );
  }
  updateProfile() {
    this.storeMemberships.push({storeId: this.storeId, name: this.storeName});
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
