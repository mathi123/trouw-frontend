import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import { ExerciseOverviewComponent } from './exercise-overview/exercise-overview.component';
import { ExerciseViewComponent } from './exercise-view/exercise-view.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TherapyOverviewComponent } from './therapy-overview/therapy-overview.component';
import { TherapyViewComponent } from './therapy-view/therapy-view.component';
import { UserOverviewComponent } from './user-overview/user-overview.component';
import { UserViewComponent } from './user-view/user-view.component';
import { PatientOverviewComponent } from './patient-overview/patient-overview.component';
import { PatientViewComponent } from './patient-view/patient-view.component';
import { AuthGuard } from './auth-guard';
import { InvitePatientComponent } from './invite-patient/invite-patient.component';
import { TaskViewComponent } from './task-view/task-view.component';
import { ProfileComponent } from './profile/profile.component';
import { AssignmentViewComponent } from './assignment-view/assignment-view.component';
import { StartComponent } from './start/start.component';
import { MyTherapyViewComponent } from './my-therapy-view/my-therapy-view.component';
import { ExecutionViewComponent } from './execution-view/execution-view.component';

const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'exercises',
        component: ExerciseOverviewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'exercise/:exerciseId/task/:taskId',
        component: TaskViewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'exercise/:id',
        component: ExerciseViewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'therapies',
        component: TherapyOverviewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'therapy/:therapyId/assignment/:id',
        component: AssignmentViewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'therapy/:id',
        component: TherapyViewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'my-therapy/:therapyId/assignment/:assignmentId',
        component: ExecutionViewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'my-therapy/:id',
        component: MyTherapyViewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'patients',
        component: PatientOverviewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'invite',
        component: InvitePatientComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'patient/:id',
        component: PatientViewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '',
        component: StartComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
