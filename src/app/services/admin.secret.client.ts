import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {PersonService} from './project.user.service.client';

@Injectable()
export class AdminServiceClient implements CanActivate {
  constructor(private personService: PersonService) {}
  canActivate() {
    return this.personService.isAdmin();
  }
}

