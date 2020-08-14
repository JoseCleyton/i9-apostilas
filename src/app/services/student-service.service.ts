import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VideoLesson } from '../models/videoLesson';
import { Ebook } from '../models/ebook';
import { URLS } from './urls';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  constructor(private http: HttpClient) { }

  public getAllVideosLessonByClas(): Observable<number> {
    return this.http.get<number>(`${URLS.student}/video/totalVideosLesson`);
  }
  public getAllVideosLesson(): Observable<VideoLesson[]> {
    return this.http.get<VideoLesson[]>(`${URLS.student}/videoLesson`);
  }
  public getAllEbooksByClas(): Observable<number> {
    return this.http.get<number>(`${URLS.student}/ebook/totalEbooks`);
  }
  public getAllEbooks(): Observable<Ebook[]> {
    return this.http.get<Ebook[]>(`${URLS.student}/ebook`);
  }
}
