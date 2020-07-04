import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from '../dashStudent/student.component';
import { ListAllVideoLessonByStudentComponent } from 'src/app/list-all-video-lesson-by-student/list-all-video-lesson-by-student.component';
import { DasboardStudentComponent } from 'src/app/dasboard-student/dasboard-student.component';
import { ListAllEbooksByStudentComponent } from 'src/app/list-all-ebooks-by-student/list-all-ebooks-by-student.component';


const routes: Routes = [
  {
    path: '', component: DasboardStudentComponent, children: [
      { path: '', component: StudentComponent },
      { path: 'listAllVideosLessonByStudent', component: ListAllVideoLessonByStudentComponent },
      { path: 'listAllEbooksByStudent', component: ListAllEbooksByStudentComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
