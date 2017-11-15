import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';

@Injectable()

export class GymService {

  baseUrl = environment.baseUrl;

  constructor(private _http: Http) {}

  getAllGyms() {
    return this._http.get(this.baseUrl + '/api/project/gym' ).map(
      (res: Response) => {
        const data = res.json();
        return data;
      }
    );
  }

  getGymByName(name: String) {
    return this._http.get(this.baseUrl + '/api/project/gym?name=' + name).map(
      (res: Response) => {
        const data = res.json();
        return data;
      }
    );
  }

  getGymById(gid: String) {
    return this._http.get(this.baseUrl + '/api/project/gym/' + gid).map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  createGym(name: String, type: String, address: String) {
    const url = this.baseUrl + '/api/project/gym';
    const body = {name: name, type: type, address: address };
    return this._http.post(url, body).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }

  updateGym(gid: String, name: String, type: String, address: String) {
    const url = this.baseUrl + '/api/project/gym/' + gid;
    const body = {name: name, type: type, address: address };
    return this._http.put(url, body).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }

  deleteGym(gid: String) {
    const url = this.baseUrl + '/api/project/gym/' + gid;
    return this._http.delete(url).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }
}
