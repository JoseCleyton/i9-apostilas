import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VideoLesson } from '../models/videoLesson';
import { Observable } from 'rxjs';
import { Ebook } from '../models/ebook';
import { User } from '../models/user';
import { Clas } from '../models/clas';
import { URLS } from '../services/urls';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }


  public addVideoLesson(videoLesson: VideoLesson): Observable<any> {
    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let updatedDate = day + '/' + month + '/' + year;
    videoLesson.date = updatedDate;

    return this.http.post(`${URLS.admin}/videoLesson`, {
      videoLesson: videoLesson
    });
  }
  public getVideosLesson(): Observable<VideoLesson[]> {
    return this.http.get<VideoLesson[]>(`${URLS.admin}/videoLesson`);
  }
  public getTotalVideosLesson(): Observable<number> {
    return this.http.get<number>(`${URLS.admin}/videoLesson/totalVideosLesson`);
  }
  public updateVideoLesson(videoLesson: VideoLesson): Observable<any> {
    return this.http.put(`${URLS.admin}/videoLesson`, {
      _id: videoLesson._id,
      videoLesson: {
        title: videoLesson.title,
        description: videoLesson.description,
        clas: videoLesson.clas,
        link: videoLesson.link
      }
    });
  }

  public addEbook(ebook: Ebook): Observable<any> {
    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let updatedDate = day + '/' + month + '/' + year;
    ebook.date = updatedDate;
    return this.http.post(`${URLS.admin}/ebook`, {
      ebook: ebook
    });
  }
  public getEbooks(): Observable<Ebook[]> {
    return this.http.get<Ebook[]>(`${URLS.admin}/ebook`);
  }
  public getTotalEbooks(): Observable<number> {
    return this.http.get<number>(`${URLS.admin}/ebook/totalEbooks`);
  }
  public updateEbook(ebook: VideoLesson): Observable<any> {

    return this.http.put(`${URLS.admin}/ebook`, {
      _id: ebook._id,
      ebook: {
        title: ebook.title,
        description: ebook.description,
        clas: ebook.clas,
        link: ebook.link
      }
    });
  }


  public addUser(user: User): Observable<any> {
    return this.http.post(`${URLS.admin}/user`, {
      user: user
    });
  }
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${URLS.admin}/user`);
  }
  public getTotalUsers(): Observable<number> {
    return this.http.get<number>(`${URLS.admin}/user/totalUsers`);
  }
  public updateUser(user: any): Observable<any> {
    return this.http.put(`${URLS.admin}/user`, {
      _id: user._id,
      user: {
        name: user.name,
        clas: user.clas
      }
    });
  }
  public deleteUser(_id: string): Observable<any> {
    return this.http.delete(`${URLS.admin}/user/${_id}`);
  }

  public addClass(clas: Clas): Observable<any> {
    return this.http.post(`${URLS.admin}/clas`, {
      name: clas.name,
      schedulle: clas.schedulle,
      teacher: clas.teacher
    });
  }
  public getClasses(): Observable<Clas[]> {
    return this.http.get<Clas[]>(`${URLS.admin}/clas`);
  }
  public getTotalClasses(): Observable<Clas[]> {
    return this.http.get<Clas[]>(`${URLS.admin}/clas/totalClasses`);
  }
  public updateClas(clas: Clas): Observable<any> {
    return this.http.put(`${URLS.admin}/clas`, {
      _id: clas._id,
      clas: {
        name: clas.name,
        schedulle: clas.schedulle,
        teacher: clas.teacher
      }
    });
  }
}
