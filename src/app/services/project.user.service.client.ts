import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';

@Injectable()

export class PersonService {

  constructor(private _http: Http) {}

  baseUrl = environment.baseUrl;

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

  gePersonById(uid: String) {
    return this._http.get(this.baseUrl + '/api/project/user' + uid).map(
      (res: Response) => {
        const data = res.json();
        return data;
      }
    );
  }

  createAccount(username: String, password: String, name: String, role: String) {
    const url = this.baseUrl + '/api/project/user';
    const body = {_id: '', username: username, password: password, name: name, role: role,
                  rating: 0, followedIds: [ ], postIds: [ ], gymIds: [], storeIds: [] };
    return this._http.post(url, body).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }

  updateAccount(uid: String, username: String, password: String,
                name: String, role: String, rating: number,
                followedIds, postIds, gymIds, storeIds) {
    const url = this.baseUrl + '/api/project/user/' + uid;
    const body = {_id: uid, username: username, password: password, name: name, role: role,
      rating: rating, followedIds: followedIds, postIds: postIds, gymIds: gymIds, storeIds: storeIds };
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
