import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {StoreService} from '../../../services/project.store.service.client';
import {PersonService} from "../../../services/project.user.service.client";

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {
  @ViewChild('f') searchForm: NgForm;

  userId: String;
  username: String; email: String; password: String; name: String; role: String;
  rating: number; followedUsers: [{}]; followedByUsers: [{}]; followedDiets: [{}];
  followedWorkouts: [{}]; gymMemberships: [{}]; storeMemberships: [{}];
  allStores;
  storeInfo: String;
  type: String;
  address: String;
  storeName: String;
  constructor(private router: Router, private storeService: StoreService,
              private activatedRoute: ActivatedRoute, private accountService: PersonService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
        });
    this.storeService.getStores().subscribe(
      (data: any) => {
        this.allStores = data;
      },
      (error: any) => {

      }
    );
  }

  searchStoreByName() {
    this.storeInfo = this.searchForm.value.name;

    this.storeService.getStoreByName(this.storeInfo).subscribe(
      (data: any) => {
        this.allStores = data;
      },
      (error: any) => {

      }
    );
  }

  searchStoreByType() {
    this.storeInfo = this.searchForm.value.type;

    this.storeService.getStoreByName(this.storeInfo).subscribe(
      (data: any) => {
        this.allStores = data;
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

  updateProfile(id, sn) {
    this.storeMemberships.push({storeId: id, name: sn} );
    this.accountService.updateAccount(this.userId, this.username, this.email, this.password, this.name,
      this.role, this.rating, this.followedUsers, this.followedByUsers, this.followedDiets, this.followedWorkouts,
      this.gymMemberships, this.storeMemberships).subscribe(
      (data: any) => {
        alert('you added that store to your profile');
      }, (error: any) => {
      }
    );
  }

}
