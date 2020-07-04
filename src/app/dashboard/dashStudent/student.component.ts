import { Component, OnInit } from '@angular/core';
import { StudentServiceService } from 'src/app/services/student-service.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  public totalEbooks: number;
  public totalVideosLesson: number;
  public loadingTotalVideosLesson: boolean;
  public loadingTotalEbooks: boolean;

  constructor(private studentService: StudentServiceService) { }

  ngOnInit() {
    this.loadingTotalEbooks = true;
    this.loadingTotalVideosLesson = true;

    this.studentService.getAllVideosLessonByClas().subscribe(
      (data: any) => {
        this.totalVideosLesson = data.totalVideosLesson;
        this.loadingTotalVideosLesson = false;
      },
      () => {
        this.loadingTotalVideosLesson = false;
      }
    )
    this.studentService.getAllEbooksByClas().subscribe(
      (data: any) => {
        this.totalEbooks = data.totalEbooks;
        this.loadingTotalEbooks = false;
      },
      () => {
        this.loadingTotalEbooks = false;
      }
    )
  }

}
