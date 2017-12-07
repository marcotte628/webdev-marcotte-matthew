import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {SharedService} from './shared.service.client';
import {Router} from '@angular/router';

@Injectable()

export class PersonService {

  options: RequestOptions = new RequestOptions();

  constructor(private _http: Http, private sharedService: SharedService,
              private router: Router) {}

  baseUrl = environment.baseUrl;

  // perform register
  register(username: String, password: String) {
    const url = this.baseUrl + '/api/project/register';
    const credentials = {
      username: username,
      password: password
    };
    this.options.withCredentials = true;
    return this._http.post(url, credentials, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  // perform login
  login(username: String, password: String) {
    const url = this.baseUrl + '/api/project/login';
    const credentials = {
      username: username,
      password: password
    };
    this.options.withCredentials = true;
    return this._http.post(url, credentials, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  loggedIn() {
    const url = this.baseUrl + '/api/project/loggedIn';
    this.options.withCredentials = true;

    console.log('checking if project user is logged in...');
    return this._http.post(url, '', this.options)
      .map((res: Response) => {
        const user = res.json();
        console.log('got this user back -> ' + user)
        if (user !== 0) {
          this.sharedService.user = user;
          return true;
        } else {
          this.router.navigate(['/project/login']);
          return false;
        }
      });
  }

  getPerson() {
    return this._http.get(this.baseUrl + '/api/project/user' ).map(
      (res: Response) => {
        const data = res.json();
        return data;
      }
    );
  }

  getPersonByUsername(username: String) {
    return this._http.get(this.baseUrl + '/api/project/user?username=' + username).map(
      (res: Response) => {
        const data = res.json();
        return data;
      }
    );
  }

  getPersonByCredentials(username: String, password: String) {
    return this._http.get(this.baseUrl + '/api/project/user?username=' + username + '&password=' + password).map(
      (res: Response) => {
        const data = res.json();
        return data;
      }
    );
  }


  gePersonById(uid: String) {
    return this._http.get(this.baseUrl + '/api/project/user/' + uid).map(
      (res: Response) => {
        const data = res.json();
        return data;
      }
    );
  }

  createAccount(username: String, password: String, name: String, role: String) {
    const url = this.baseUrl + '/api/project/user';
    const body = {username: username, password: password, name: name, role: role,
                  rating: 0, followedUsers: [ ], followedByUsers: [ ], followedDiets: [],
                  followedWorkouts: [ ], gymMemberships: [ ], storeMemberships: [ ]};
    return this._http.post(url, body).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }

  updateAccount(uid: String, username: String, email: String, password: String, name: String, role: String,
                rating: number, followedUsers: [{}], followedByUsers: [{}], followedDiets: [{}],
                followedWorkouts: [{}], gymMemberships: [{}], storeMemberships: [{}]) {
    const url = this.baseUrl + '/api/project/user/' + uid;
    const body = {username: username, password: password, email: email, name: name, role: role,
      rating: rating, followedUsers: followedUsers, followedByUsers: followedByUsers,
      followedDiets: followedDiets, followedWorkouts: followedWorkouts,
      gymMemberships: gymMemberships, storeMemberships: storeMemberships};
return this._http.put(url, body).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }

  deleteAccount(uid: String) {
    const url = this.baseUrl + '/api/project/user/' + uid;
    return this._http.delete(url).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }

}
