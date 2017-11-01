import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';

@Injectable()

export class FoodService {

  constructor(private _http: Http) {}

  baseUrl = environment.baseUrl;

  getFoodPost() {
    return this._http.get(this.baseUrl + '/api/project/food' ).map(
      (res: Response) => {
        const data = res.json();
        return data;
      }
    );
  }

  getFoodPostByName(name: String) {
    return this._http.get(this.baseUrl + '/api/project/food?name=' + name ).map(
      (res: Response) => {
        const data = res.json();
        return data;
      }
    );
  }

  getFoodPostById(fid: String) {
    return this._http.get(this.baseUrl + '/api/project/food' + fid).map(
      (res: Response) => {
        const data = res.json();
        return data;
      }
    );
  }

  createFoodPost(name: String, type: String, uid: String, protein: String, carbs: String, fats: String) {
    const url = this.baseUrl + '/api/project/food';
    const body = {_id: '', name: name, type: type, userId: uid, protein: protein, carbs: carbs, fats: fats };
    return this._http.post(url, body).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }

  updateFoodPost(fid: String, name: String, type: String, uid: String, protein: String, carbs: String, fats: String) {
    const url = this.baseUrl + '/api/project/food/' + fid;
    const body = {_id: fid, name: name, type: type, userId: uid, protein: protein, carbs: carbs, fats: fats };
    return this._http.put(url, body).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }

  deleteFoodPost(fid: String) {
    const url = this.baseUrl + '/api/project/doof/' + fid;
    return this._http.delete(url).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }
}
