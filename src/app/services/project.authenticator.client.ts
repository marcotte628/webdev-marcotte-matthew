import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {PersonService} from './project.user.service.client';

@Injectable()
export class ProjectAuthenticatorClient implements CanActivate {
  constructor(private personService: PersonService, private router: Router) {}
  canActivate() {
    return this.personService.loggedIn();
  }
}
