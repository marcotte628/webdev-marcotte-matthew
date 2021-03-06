import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';

@Injectable()

export class WorkoutService {

  constructor(private _http: Http) {}

  baseUrl = environment.baseUrl;


  getAllWorkouts() {
    return this._http.get(this.baseUrl + '/api/project/workout' ).map(
      (res: Response) => {
        const data = res.json();
        return data;
      }
    );
  }

  getWorkoutById(wid: String) {
    return this._http.get(this.baseUrl + '/api/project/workout/' + wid).map(
      (res: Response) => {
        const data = res.json();
        return data;
      }
    );
  }

  getWorkoutByName(name: String) {
    return this._http.get(this.baseUrl + '/api/project/workout?name=' + name).map(
      (res: Response) => {
        const data = res.json();
        return data;
      }
    );
  }

  getWorkoutByType(type: String) {
    return this._http.get(this.baseUrl + '/api/project/workout?type=' + type).map(
      (res: Response) => {
        const data = res.json();
        return data;
      }
    );
  }

  createWorkout(name: String, type: String, difficulty: number, image: String, user: String) {
    const url = this.baseUrl + '/api/project/workout';
    const body = {name: name, type: type, difficulty: difficulty, userId: user, image: image};
    return this._http.post(url, body).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }

  updateWorkout(wid: String, name: String, type: String, difficulty: number, image: String, user: String) {
    const url = this.baseUrl + '/api/project/workout/' + wid;
    const body = {name: name, type: type, difficulty: difficulty, userID: user, image: image};
    return this._http.put(url, body).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }

  deleteWorkout(wid: String) {
    const url = this.baseUrl + '/api/project/workout/' + wid;
    return this._http.delete(url).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }

}
