import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TestService } from './services/test.service.client';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TestComponent } from './components/test/test.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { WebsiteNewComponent } from './components/website/website-new/website-new.component';
import { WebsiteEditComponent } from './components/website/website-edit/website-edit.component';
import { WebsiteListComponent } from './components/website/website-list/website-list.component';
import { PageEditComponent } from './components/page/page-edit/page-edit.component';
import { PageListComponent } from './components/page/page-list/page-list.component';
import { PageNewComponent } from './components/page/page-new/page-new.component';
import { WidgetHeaderComponent } from './components/widget/widget-edit/widget-header/widget-header.component';
import { WidgetImageComponent } from './components/widget/widget-edit/widget-image/widget-image.component';
import { WidgetYoutubeComponent } from './components/widget/widget-edit/widget-youtube/widget-youtube.component';
import { WidgetChooserComponent } from './components/widget/widget-chooser/widget-chooser.component';
import { WidgetEditComponent } from './components/widget/widget-edit/widget-edit.component';
import { WidgetListComponent } from './components/widget/widget-list/widget-list.component';

import { Routing } from './app.routing';

import { UserService } from './services/user.service.client';
import { WebsiteService } from './services/website.service.client';
import { PageService } from './services/page.service.client';
import { WidgetService } from './services/widget.service.client';
import {SortableDirective} from '../../assignment/directives/directive.sortable';
import {SafePipe} from './services/widget.service.client.safePipe';

import { QuillEditorModule } from 'ngx-quill-editor';

// project components
import {ProjectLoginComponent} from './components/project-user/project-login/project-login.component';
import { ProjectProfileComponent } from './components/project-user/project-profile/project-profile.component';
import { ProjectRegisterComponent } from './components/project-user/project-register/project-register.component';
import { CertifiedDietsComponent } from './components/project-posts/diets/certified-diets/certified-diets.component';
import { GerneralDietsComponent } from './components/project-posts/diets/gerneral-diets/gerneral-diets.component';
import { CertifiedWorkoutsComponent } from './components/project-posts/workouts/certified-workouts/certified-workouts.component';
import { GeneralWorkoutsComponent } from './components/project-posts/workouts/general-workouts/general-workouts.component';
import { DietPostComponent } from './components/project-details/diet-post/diet-post.component';
import { WorkoutPostComponent } from './components/project-details/workout-post/workout-post.component';
import { ViewOtherComponent } from './components/project-user/view-other/view-other.component';
import {FoodService} from './services/project.food.service.client';
import {GymService} from './services/project.gym.service.client';
import {StoreService} from './services/project.store.service.client';
import {PersonService} from './services/project.user.service.client';
import {WorkoutService} from './services/project.workout.service.client';
import { GymsComponent } from './components/project-posts/gyms/gyms.component';
import { StoresComponent } from './components/project-posts/stores/stores.component';
import { GymPostComponent } from './components/project-details/gym-post/gym-post.component';
import { StorePostComponent } from './components/project-details/store-post/store-post.component';
import { NewStoreComponent } from './components/project-create/new-store/new-store.component';
import { NewGymComponent } from './components/project-create/new-gym/new-gym.component';
import { NewWorkoutComponent } from './components/project-create/new-workout/new-workout.component';
import { NewDietComponent } from './components/project-create/new-diet/new-diet.component';
import { NewHeaderComponent } from './components/widget/widget-new/new-header/new-header.component';
import { NewImageComponent } from './components/widget/widget-new/new-image/new-image.component';
import { NewYoutubeComponent } from './components/widget/widget-new/new-youtube/new-youtube.component';
import { NewHtmlComponent } from './components/widget/widget-new/new-html/new-html.component';
import {WidgetHtmlComponent} from './components/widget/widget-edit/widget-html/widget-html.component';
import { WidgetTextComponent } from './components/widget/widget-edit/widget-text/widget-text.component';
import { NewTextComponent } from './components/widget/widget-new/new-text/new-text.component';
import { NewFlickrImageComponent } from './components/widget/widget-new/new-image/new-flickr-image/new-flickr-image.component';
import {FlickrService} from './services/flickr.service.client';
import {SharedService} from './services/shared.service.client';

@NgModule({
  // Declare components here
  declarations: [
    SortableDirective,
    AppComponent,
    HomeComponent,
    TestComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    WebsiteNewComponent,
    WebsiteEditComponent,
    WebsiteListComponent,
    PageEditComponent,
    PageListComponent,
    PageNewComponent,
    WidgetHeaderComponent,
    WidgetImageComponent,
    WidgetYoutubeComponent,
    WidgetChooserComponent,
    WidgetEditComponent,
    WidgetListComponent,
    SafePipe,
    ProjectLoginComponent,
    ProjectProfileComponent,
    ProjectRegisterComponent,
    CertifiedDietsComponent,
    GerneralDietsComponent,
    CertifiedWorkoutsComponent,
    GeneralWorkoutsComponent,
    DietPostComponent,
    WorkoutPostComponent,
    ViewOtherComponent,
    GymsComponent,
    StoresComponent,
    GymPostComponent,
    StorePostComponent,
    NewStoreComponent,
    NewGymComponent,
    NewWorkoutComponent,
    NewDietComponent,
    NewHeaderComponent,
    NewImageComponent,
    NewYoutubeComponent,
    NewHtmlComponent,
    WidgetHtmlComponent,
    WidgetTextComponent,
    NewTextComponent,
    NewFlickrImageComponent
  ],
  imports: [
    QuillEditorModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    Routing
  ],
  // Client Side services here
  providers: [ TestService, UserService, WebsiteService, PageService, WidgetService,
    FoodService, GymService, StoreService, PersonService, WorkoutService, FlickrService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
