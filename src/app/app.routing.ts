/**
 * Created by sesha on 7/26/17.
 */

import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ModuleWithProviders} from '@angular/core';
import {TestComponent} from './components/test/test.component';
import {LoginComponent} from './components/user/login/login.component';
import {RegisterComponent} from './components/user/register/register.component';
import {ProfileComponent} from './components/user/profile/profile.component';
import {WebsiteEditComponent} from './components/website/website-edit/website-edit.component';
import {WebsiteListComponent} from './components/website/website-list/website-list.component';
import {WebsiteNewComponent} from './components/website/website-new/website-new.component';
import {PageEditComponent} from './components/page/page-edit/page-edit.component';
import {PageListComponent} from './components/page/page-list/page-list.component';
import {PageNewComponent} from './components/page/page-new/page-new.component';
import {WidgetChooserComponent} from './components/widget/widget-chooser/widget-chooser.component';
import {WidgetEditComponent} from './components/widget/widget-edit/widget-edit.component';
import {WidgetListComponent} from './components/widget/widget-list/widget-list.component';

// project components
import {ProjectLoginComponent} from './components/project-user/project-login/project-login.component';
import { ProjectProfileComponent } from './components/project-user/project-profile/project-profile.component';
import { ProjectRegisterComponent } from './components/project-user/project-register/project-register.component';
import { CertifiedDietsComponent } from './components/project-posts/diets/certified-diets/certified-diets.component';
import { GerneralDietsComponent } from './components/project-posts/diets/gerneral-diets/gerneral-diets.component';
import { CertifiedWorkoutsComponent } from './components/project-posts/workouts/certified-workouts/certified-workouts.component';
import { GeneralWorkoutsComponent } from './components/project-posts/workouts/general-workouts/general-workouts.component';
import { GymsComponent } from './components/project-posts/gyms/gyms.component';
import { StoresComponent } from './components/project-posts/stores/stores.component';
import { DietPostComponent } from './components/project-details/diet-post/diet-post.component';
import { WorkoutPostComponent } from './components/project-details/workout-post/workout-post.component';
import { GymPostComponent} from './components/project-details/gym-post/gym-post.component';
import { StorePostComponent } from './components/project-details/store-post/store-post.component';
import { ViewOtherComponent } from './components/project-user/view-other/view-other.component';
import { NewDietComponent } from './components/project-create/new-diet/new-diet.component';
import { NewGymComponent } from './components/project-create/new-gym/new-gym.component';
import { NewStoreComponent } from './components/project-create/new-store/new-store.component';
import { NewWorkoutComponent } from './components/project-create/new-workout/new-workout.component';

import {NewHeaderComponent} from './components/widget/widget-new/new-header/new-header.component';
import { NewImageComponent } from './components/widget/widget-new/new-image/new-image.component';
import { NewYoutubeComponent } from './components/widget/widget-new/new-youtube/new-youtube.component';
import { NewHtmlComponent } from './components/widget/widget-new/new-html/new-html.component';
import { NewTextComponent } from './components/widget/widget-new/new-text/new-text.component';
import { NewFlickrImageComponent } from './components/widget/widget-new/new-image/new-flickr-image/new-flickr-image.component';



const APP_ROUTES: Routes = [
  {path: '', component : HomeComponent},
  {path: 'test', component: TestComponent},
  { path : 'login' , component: LoginComponent},
  { path : 'register' , component: RegisterComponent },
  { path : 'user/:uid' , component: ProfileComponent},
  { path : 'user/:uid/website' , component: WebsiteListComponent},
  { path : 'user/:uid/website/new' , component: WebsiteNewComponent},
  { path : 'user/:uid/website/:wid' , component: WebsiteEditComponent},
  { path : 'user/:uid/website/:wid/page' , component: PageListComponent},
  { path : 'user/:uid/website/:wid/page/new' , component: PageNewComponent},
  { path : 'user/:uid/website/:wid/page/:pid' , component: PageEditComponent},
  { path : 'user/:uid/website/:wid/page/:pid/widget/new' , component: WidgetChooserComponent},
  { path : 'user/:uid/website/:wid/page/:pid/widget/:wgid' , component: WidgetEditComponent},
  { path : 'user/:uid/website/:wid/page/:pid/widget' , component: WidgetListComponent},
  { path : 'user/:uid/website/:wid/page/:pid/new-header' , component: NewHeaderComponent},
  { path : 'user/:uid/website/:wid/page/:pid/new-image' , component: NewImageComponent},
  { path : 'user/:uid/website/:wid/page/:pid/new-youtube' , component: NewYoutubeComponent},
  { path : 'user/:uid/website/:wid/page/:pid/new-html' , component: NewHtmlComponent},
  { path : 'user/:uid/website/:wid/page/:pid/new-text' , component: NewTextComponent},
  { path : 'user/:uid/website/:wid/page/:pid/new-flickr' , component: NewFlickrImageComponent},

  // project routes
  { path: 'project/login', component: ProjectLoginComponent},
  { path: 'project/register', component: ProjectRegisterComponent},
  { path: 'project/user/:uid', component: ProjectProfileComponent},
  { path: 'project/user/:uid/new-workout', component: NewWorkoutComponent},
  { path: 'project/user/:uid/new-food', component: NewDietComponent},
  { path: 'project/user/:uid/new-store', component: NewStoreComponent},
  { path: 'project/user/:uid/new-gym', component: NewGymComponent},
  { path: 'project/user/:uid/cert-diets', component: CertifiedDietsComponent},
  { path: 'project/user/:uid/gen-diets', component: GerneralDietsComponent},
  { path: 'project/user/:uid/cert-workouts', component: CertifiedWorkoutsComponent},
  { path: 'project/user/:uid/gen-workouts', component: GeneralWorkoutsComponent},
  { path: 'project/user/:uid/gyms', component: GymsComponent},
  { path: 'project/user/:uid/stores', component: StoresComponent},
  { path: 'project/user/:uid/diets/:fid', component: DietPostComponent},
  { path: 'project/user/:uid/workouts/:wid', component: WorkoutPostComponent},
  { path: 'project/user/:uid/gyms/:gid', component: GymPostComponent},
  { path: 'project/user/:uid/stores/:sid', component: StorePostComponent},
  { path: 'project/user/:uid/other-user/:oid', component: ViewOtherComponent},
];

// Export the routes as module providers
export const Routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
