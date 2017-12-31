import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { UserService } from './user.service';
import { ContextService } from './context.service';
import { TherapyService } from './therapy.service';
import { ExerciseService } from './exercise.service';
import { TaskService } from './task.service';
import { AssignmentService } from './assignment.service';
import { FileService } from './file.service';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TherapyOverviewComponent } from './therapy-overview/therapy-overview.component';
import { TherapyViewComponent } from './therapy-view/therapy-view.component';
import { ExerciseOverviewComponent } from './exercise-overview/exercise-overview.component';
import { ExerciseViewComponent } from './exercise-view/exercise-view.component';
import { TaskOverviewComponent } from './task-overview/task-overview.component';
import { TaskViewComponent } from './task-view/task-view.component';
import { StepOverviewComponent } from './step-overview/step-overview.component';
import { StepViewComponent } from './step-view/step-view.component';
import { AssignmentOverviewComponent } from './assignment-overview/assignment-overview.component';
import { AssignmentViewComponent } from './assignment-view/assignment-view.component';
import { TextStepComponent } from './text-step/text-step.component';
import { ImageStepComponent } from './image-step/image-step.component';
import { AudioStepComponent } from './audio-step/audio-step.component';
import { VideoStepComponent } from './video-step/video-step.component';
import { AudioInputStepComponent } from './audio-input-step/audio-input-step.component';
import { VideoInputStepComponent } from './video-input-step/video-input-step.component';
import { MyTherapyOverviewComponent } from './my-therapy-overview/my-therapy-overview.component';
import { MyTherapyViewComponent } from './my-therapy-view/my-therapy-view.component';
import { UserOverviewComponent } from './user-overview/user-overview.component';
import { UserViewComponent } from './user-view/user-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientOverviewComponent } from './patient-overview/patient-overview.component';
import { PatientViewComponent } from './patient-view/patient-view.component';
import { AuthGuard } from './auth-guard';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { InvitePatientComponent } from './invite-patient/invite-patient.component';
import { AudioContextService } from './audio-context.service';
import { ProfileComponent } from './profile/profile.component';
import { StartComponent } from './start/start.component';
import { HotJarService } from './hot-jar.service';
import { ExecutionViewComponent } from './execution-view/execution-view.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    TherapyOverviewComponent,
    TherapyViewComponent,
    ExerciseOverviewComponent,
    ExerciseViewComponent,
    TaskOverviewComponent,
    TaskViewComponent,
    StepOverviewComponent,
    StepViewComponent,
    AssignmentOverviewComponent,
    AssignmentViewComponent,
    TextStepComponent,
    ImageStepComponent,
    AudioStepComponent,
    VideoStepComponent,
    AudioInputStepComponent,
    VideoInputStepComponent,
    MyTherapyOverviewComponent,
    MyTherapyViewComponent,
    UserOverviewComponent,
    UserViewComponent,
    PatientOverviewComponent,
    PatientViewComponent,
    ConfirmDialogComponent,
    InvitePatientComponent,
    ProfileComponent,
    StartComponent,
    ExecutionViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  entryComponents: [ConfirmDialogComponent],
  providers: [UserService, ContextService, TherapyService, ExerciseService, TaskService, AudioContextService,
    AssignmentService, FileService, AuthGuard, HotJarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
