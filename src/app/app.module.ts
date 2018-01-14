import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';

import { AppComponent } from './app.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StartComponent } from './start/start.component';
import { HotJarService } from './hot-jar.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    StartComponent
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
  providers: [UserService, ContextService, TherapyService, ExerciseService, TaskService,
    AssignmentService, FileService, HotJarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
