import { Component, OnInit } from '@angular/core';
import { VideoLesson } from '../models/videoLesson';
import { StudentServiceService } from '../services/student-service.service';

@Component({
  selector: 'app-list-all-video-lesson-by-student',
  templateUrl: './list-all-video-lesson-by-student.component.html',
  styleUrls: ['./list-all-video-lesson-by-student.component.css']
})
export class ListAllVideoLessonByStudentComponent implements OnInit {
  public videosLesson: VideoLesson[];
  public message: string;
  public loadingPage: boolean;

  constructor(private studentService: StudentServiceService) { }

  ngOnInit() {
    this.loadingPage = true;
    this.message = 'Aguarde. Buscando Dados...'
    this.studentService.getAllVideosLesson().subscribe(
      (data: any) => {
        this.videosLesson = data.videosLesson;
        this.message = '';
        this.loadingPage = false;
      },
      () => {
        this.message = 'Erro ao buscar dados !!! '
        this.loadingPage = false;
      }
    )
  }
  public openLink(link: string) {
    window.open(`//${link}`);
  }

}
