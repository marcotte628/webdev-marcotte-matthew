import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import {StoreService} from '../../../services/project.store.service.client';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {
  @ViewChild('f') searchForm: NgForm;

  storeInfo: String;
  stores;
  name: String;
  type: String;
  address: String;
  constructor(private router: Router, private storeService: StoreService) { }

  ngOnInit() {
  }

  searchStore() {
    this.storeInfo = this.searchForm.value.store;

    this.storeService.getStoreByName(this.storeInfo).subscribe(
      (data: any) => {
        this.stores = data;
        this.name = data.name;
        this.type = data.type;
        this.address = data.address;
      },
      (error: any) => {

      }
    );
  }

}
