import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';

@Injectable()

export class StoreService {

  constructor(private _http: Http) {}

  baseUrl = environment.baseUrl;

  getStores() {
    return this._http.get(this.baseUrl + '/api/project/stores' ).map(
      (res: Response) => {
        const data = res.json();
        return data;
      }
    );
  }
  getStoreById(sid: String) {
    return this._http.get(this.baseUrl + '/api/project/stores' + sid).map(
      (res: Response) => {
        const data = res.json();
        return data;
      }
    );
  }
  getStoreByName(name: String) {
    return this._http.get(this.baseUrl + '/api/project/stores?name=' + name).map(
      (res: Response) => {
        const data = res.json();
        return data;
      }
    );
  }
  createStore(name: String, type: String, address: String) {
    const url = this.baseUrl + '/api/project/stores';
    const body = {_id: '', name: name, type: type, address: address};
    return this._http.post(url, body).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }
  updateStore(sid: String, name: String, type: String, address: String) {
    const url = this.baseUrl + '/api/project/stores/' + sid;
    const body = {_id: sid, name: name, type: type, address: address};
    return this._http.put(url, body).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }
  deleteStore(sid: String) {
    const url = this.baseUrl + '/api/project/stores/' + sid;
    return this._http.delete(url).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }
}