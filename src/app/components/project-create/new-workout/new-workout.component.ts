import {  Component, OnInit, ViewChild  } from '@angular/core';
import {PersonService} from '../../../services/project.user.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {WorkoutService} from '../../../services/project.workout.service.client';


@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.css']
})
export class NewWorkoutComponent implements OnInit {
  @ViewChild('f') workoutForm: NgForm;
  userId: String;
  username: String;
  password: String;
  name: String;
  email: String;
  role: String;
  rating: number;
  followedUsers: [{}];
  followedByUsers: [{}];
  followedDiets: [{}];
  followedWorkouts: [{}];
  gymMemberships: [{}];
  storeMemberships: [{}];
  difficulty: number;
  image: String;
  newWorkout;
  workoutName: String;
  type: String;

  constructor(private activatedRoute: ActivatedRoute,
              private  personService: PersonService,
              private router: Router,
              private workoutService: WorkoutService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
        });
  }

  createWorkout() {
    this.workoutName = this.workoutForm.value.workoutName;
    this.type = this.workoutForm.value.type;
    this.image = this.workoutForm.value.image;
    this.difficulty = this.workoutForm.value.diff;
    const newPost = { name: this.workoutName, type: this.type, difficulty: this.difficulty,
                      userId: this.userId, image: this.image};
    this.workoutService.createWorkout(this.workoutName, this.type, this.difficulty, this.image, this.userId).subscribe(
      (data: any) => {
          this.newWorkout = data;
          this.getProfileInfo();
      },
      (error: any) => {
      }
    );

  }

  getProfileInfo() {
    this.personService.gePersonById(this.userId).subscribe(
      (data: any) => {
        this.username = data.username;
        this.password = data.password;
        this.name = data.name;
        this.email = data.email;
        this.role = data.role;
        this.rating = data.rating;
        this.followedUsers = data.followedUsers;
        this.followedByUsers = data.followedByUsers;
        this.followedDiets = data.followedDiets;
        this.followedWorkouts = data.followedWorkouts;
        this.gymMemberships = data.gymMemberships;
        this.storeMemberships = data.storeMemberships;
        this.addToProfile();
      },
      (error: any) => {
      }
    );
  }

  addToProfile() {
    this.followedWorkouts.push({workoutId: this.newWorkout._id, name: this.workoutName});
    this.personService.updateAccount(this.userId, this.username, this.email, this.password, this.name, this.role,
      this.rating, this.followedUsers, this.followedByUsers, this.followedDiets, this.followedWorkouts,
      this.gymMemberships, this.storeMemberships).subscribe(
      (data: any) => {
        this.router.navigate(['/project/user/' + this.userId]);
      },
      (error: any) => {
      }
    );
  }


}
