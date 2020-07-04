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
  public messageLoading: string;
  public loadingPage: boolean;

  constructor(private studentService: StudentServiceService) { }

  ngOnInit() {
    this.loadingPage = false;
    this.messageLoading = 'Aguarde. Buscando Dados...'
    this.studentService.getAllVideosLesson().subscribe(
      (data: any) => {
        this.videosLesson = data.videosLesson;
        this.messageLoading = '';
        this.loadingPage = false;
      },
      () => {
        this.messageLoading = 'Erro ao buscar dados !!! '
        this.loadingPage = false;
      }
    )
  }
  public openLink(link: string) {
    window.open(`//${link}`);
  }

}
