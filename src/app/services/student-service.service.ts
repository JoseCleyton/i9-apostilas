import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VideoLesson } from '../models/videoLesson';
import { Ebook } from '../models/ebook';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  constructor(private http: HttpClient) { }

  public getAllVideosLessonByClas(): Observable<number> {
    return this.http.get<number>('http://localhost:3000/student/video/totalVideosLesson');
  }
  public getAllVideosLesson(): Observable<VideoLesson[]> {
    return this.http.get<VideoLesson[]>('http://localhost:3000/student/videoLesson');
  }
  public getAllEbooksByClas(): Observable<number> {
    return this.http.get<number>('http://localhost:3000/student/ebook/totalEbooks');
  }
  public getAllEbooks(): Observable<Ebook[]> {
    return this.http.get<Ebook[]>('http://localhost:3000/student/ebook');
  }
}
