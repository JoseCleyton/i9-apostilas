import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from '../dashStudent/student.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentServiceService } from 'src/app/services/student-service.service';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Interceptor } from 'src/app/services/interceptor';
import { AuthGuardGuard } from 'src/app/auth-guard.guard';
import { ListAllVideoLessonByStudentComponent } from 'src/app/list-all-video-lesson-by-student/list-all-video-lesson-by-student.component';
import { DasboardStudentComponent } from 'src/app/dasboard-student/dasboard-student.component';
import { ListAllEbooksByStudentComponent } from 'src/app/list-all-ebooks-by-student/list-all-ebooks-by-student.component';

@NgModule({
  declarations: [
    StudentComponent,
    ListAllVideoLessonByStudentComponent,
    DasboardStudentComponent,
    ListAllEbooksByStudentComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    Interceptor
  ],
  providers:[
    StudentServiceService,
    AuthGuardGuard
  ]
})
export class StudentModule { }
