import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StoreService} from '../../../services/project.store.service.client';
import {PersonService} from '../../../services/project.user.service.client';

@Component({
  selector: 'app-store-post',
  templateUrl: './store-post.component.html',
  styleUrls: ['./store-post.component.css']
})
export class StorePostComponent implements OnInit {
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
  storeMemberships: [{storeId: String, name: String}];
  storeData;
  storeId: String;
  constructor(private activatedRoute: ActivatedRoute, private storeService: StoreService,
              private accountService: PersonService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.storeId = params['sid'];
        });
    this.storeService.getStoreById(this.storeId).subscribe(
      (data: any) => {
        this.storeData = data;
      }, (error: any) => {
      }
    );
  }

  follow() {
    this.accountService.gePersonById(this.userId).subscribe(
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
          this.addToProfile();
        }
      },
      (error: any) => {
      }
    );
  }

  addToProfile() {
    this.storeMemberships.push({storeId: this.storeId, name: this.storeData.name});
    this.accountService.updateAccount(this.userId, this.username, this.email, this.password, this.name, this.role,
      this.rating, this.followedUsers, this.followedByUsers, this.followedDiets, this.followedWorkouts,
      this.gymMemberships, this.storeMemberships).subscribe(
      (data: any) => {
        alert('you now follow this store');
      },
      (error: any) => {
      }
    );
  }

  unfollow() {this.accountService.gePersonById(this.userId).subscribe(
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
      this.removeFromProfile();
    },
    (error: any) => {
    }
  );
  }

  removeFromProfile() {
    for (let i = 0; i < this.storeMemberships.length; i++) {
      if (this.storeMemberships[i].storeId === this.storeId ) {
        this.storeMemberships.splice(i, 1);
      }
    }

    this.accountService.updateAccount(this.userId, this.username, this.email, this.password, this.name, this.role,
      this.rating, this.followedUsers, this.followedByUsers, this.followedDiets, this.followedWorkouts,
      this.gymMemberships, this.storeMemberships).subscribe(
      (data: any) => {
        alert('you no longer follow this store');
      },
      (error: any) => {
      }
    );
  }

}
