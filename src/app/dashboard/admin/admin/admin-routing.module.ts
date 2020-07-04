import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from '../../dashAdmin/admin.component';
import { AddVideoLessonComponent } from 'src/app/add-video-lesson/add-video-lesson.component';
import { ListVideoLessonsComponent } from 'src/app/list-video-lessons/list-video-lessons.component';
import { AddClasComponent } from 'src/app/add-clas/add-clas.component';
import { AddEbookComponent } from 'src/app/add-ebook/add-ebook.component';
import { ListAllEbooksComponent } from 'src/app/list-all-ebooks/list-all-ebooks.component';
import { AddUserComponent } from 'src/app/add-user/add-user.component';
import { ListAllUsersComponent } from 'src/app/list-all-users/list-all-users.component';
import { ListAllClassesComponent } from 'src/app/list-all-classes/list-all-classes.component';
import { DashboardComponent } from '../../dashboard.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: AdminComponent },
      { path: 'addVideoLesson', component: AddVideoLessonComponent },
      { path: 'listAllVideosLesson', component: ListVideoLessonsComponent },
      { path: 'addEbook', component: AddEbookComponent },
      { path: 'listAllEbooks', component: ListAllEbooksComponent },
      { path: 'addUser', component: AddUserComponent },
      { path: 'listAllUsers', component: ListAllUsersComponent },
      { path: 'addClas', component: AddClasComponent },
      { path: 'listAllClasses', component: ListAllClassesComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
