import { Component, OnInit } from '@angular/core';
import {PersonService} from '../../../services/project.user.service.client';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {

  users = [];
  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.personService.findAllUsers().subscribe((users) => {
      this.users = users;
    });

  }

}

