import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from '../../dashAdmin/admin.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AdminService } from 'src/app/services/admin.service';
import { HttpClientModule } from '@angular/common/http';
import { AddVideoLessonComponent } from 'src/app/add-video-lesson/add-video-lesson.component';
import { MatTableModule } from '@angular/material/table';
import { ListVideoLessonsComponent } from 'src/app/list-video-lessons/list-video-lessons.component';
import { AddClasComponent } from 'src/app/add-clas/add-clas.component';
import { Interceptor } from 'src/app/services/interceptor';
import { AddEbookComponent } from 'src/app/add-ebook/add-ebook.component';
import { ListAllEbooksComponent } from 'src/app/list-all-ebooks/list-all-ebooks.component';
import { AddUserComponent } from 'src/app/add-user/add-user.component';
import { ListAllUsersComponent } from 'src/app/list-all-users/list-all-users.component';
import { ListAllClassesComponent } from 'src/app/list-all-classes/list-all-classes.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardComponent } from '../../dashboard.component';

@NgModule({
  declarations: [
    AdminComponent,
    AddVideoLessonComponent,
    ListVideoLessonsComponent,
    AddClasComponent,
    AddEbookComponent,
    ListAllEbooksComponent,
    AddUserComponent,
    ListAllUsersComponent,
    ListAllClassesComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    HttpClientModule,
    MatTableModule,
    Interceptor,
    MatProgressSpinnerModule
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule { }
