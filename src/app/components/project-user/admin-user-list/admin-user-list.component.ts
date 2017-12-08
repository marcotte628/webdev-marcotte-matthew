import { Component, OnInit } from '@angular/core';
import {PersonService} from '../../../services/project.user.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {

  users = [];
  userId: String;
  username: String;
  email: String;
  password: String;
  name: String;
  role: String;
  rating: number;
  followedUsers: [{}];
  followedByUsers: [{}];
  followedDiets: [{}];
  followedWorkouts: [{}];
  gymMemberships: [{}];
  storeMemberships: [{}];
  constructor(private personService: PersonService, private router: Router) { }

  ngOnInit() {
    this.personService.findAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  selectUser(username) {
    this.personService.getPersonByUsername(username).subscribe(
      (data: any) => {
        this.userId = data._id;
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
        this.router.navigate(['/project/admin/user']);
      },
      (error: any) => {
      });
  }

  updateUser() {
    this.personService.updateAccount(this.userId, this.username, this.email, this.password, this.name, this.role,
      this.rating, this.followedUsers, this.followedByUsers, this.followedDiets, this.followedWorkouts,
      this.gymMemberships, this.storeMemberships).subscribe(
      (data: any) => {
        this.userId = data._id;
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
        this.router.navigate(['/project/admin/user']);
      },
      (error: any) => {
      });
  }

  deleteUser() {
    this.personService.deleteAccount(this.userId).subscribe(
      (data: any) => {
        this.userId = '';
        this.username = '';
        this.email = '';
        this.password = '';
        this.name = '';
        this.role = '';
        this.rating = 0;
        this.followedUsers = [{}];
        this.followedByUsers = [{}];
        this.followedDiets = [{}];
        this.followedWorkouts = [{}];
        this.gymMemberships = [{}];
        this.storeMemberships = [{}];
        this.router.navigate(['/project/admin/user']);
      },
      (error: any) => {
      });
  }

  createUser() {
    if (!this.username || ! this.password || ! this.name || ! this.role ) {
      alert('must enter username, password, name, and role to create a user!');
    } else {
    this.personService.getPersonByUsername(this.username).subscribe(
      (data: any) => {
        if (data) {
          alert('there is already a user with that username. try again.');
        } else {
          this.callCreate();
        }
      }, (error: any) => {
    });
  }
  }

  callCreate() {
    // username: String, password: String, name: String, role: String
    this.personService.createAccount(this.username, this.password, this.name, this.role).subscribe(
      (data: any) => {
        alert('successfully created a user!');
        this.router.navigate(['/project/admin/user']);
      }, (error: any) => {
      });
  }
}

