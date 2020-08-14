import { Component, OnInit } from '@angular/core';
import { StudentServiceService } from '../services/student-service.service';
import { VideoLesson } from '../models/videoLesson';

@Component({
  selector: 'app-list-all-ebooks-by-student',
  templateUrl: './list-all-ebooks-by-student.component.html',
  styleUrls: ['./list-all-ebooks-by-student.component.css']
})
export class ListAllEbooksByStudentComponent implements OnInit {
  public ebooks: VideoLesson[];
  public message: string;
  public loadingPage: boolean;

  constructor(private studentService: StudentServiceService) { }

  ngOnInit() {
    this.loadingPage = true;
    this.message = 'Aguarde. Buscando Dados...'
    this.studentService.getAllEbooks().subscribe(
      (data: any) => {
        this.ebooks = data.ebooks;
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
