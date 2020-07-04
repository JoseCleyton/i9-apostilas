import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VideoLesson } from 'src/app/models/videoLesson';
import { AdminService } from 'src/app/services/admin.service';
import { Ebook } from 'src/app/models/ebook';
import { User } from 'src/app/models/user';
import { Clas } from 'src/app/models/clas';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public formAddEbook: FormGroup;
  public formAddUser: FormGroup;
  public message: string = '';
  public status: boolean;
  public totalUsers: number;
  public totalEbooks: number;
  public totalVideosLesson: number;
  public totalClasses: number;
  public loadingUser: boolean;
  public loadingVideoLesson: boolean;
  public loadingEbook: boolean;
  public loadingClas: boolean;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.loadingUser = true;
    this.loadingVideoLesson = true;
    this.loadingEbook = true;
    this.loadingClas = true;

    this.adminService.getTotalUsers().subscribe(
      (totalUsers: any) => {
        this.totalUsers = totalUsers.totalUsers;
        this.loadingUser = false;
      },
      () => {
        this.loadingUser = false;
      }
    )
    this.adminService.getTotalEbooks().subscribe(
      (totalEbooks: any) => {
        this.totalEbooks = totalEbooks.totalEbooks;
        this.loadingEbook = false;
      },
      () => {
        this.loadingEbook = false;
      }
    )
    this.adminService.getTotalVideosLesson().subscribe(
      (totalVideosLesson: any) => {
        this.totalVideosLesson = totalVideosLesson.totalVideosLesson;
        this.loadingVideoLesson = false;
      },
      () => {
        this.loadingVideoLesson = false;
      }
    )
    this.adminService.getTotalClasses().subscribe(
      (totalClasses: any) => {
        this.totalClasses = totalClasses.totalClasses;
        this.loadingClas = false;
      },
      () => {
        this.loadingClas = false;
      }
    )

    this.formAddEbook = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'link': new FormControl(null, [Validators.required]),
      'class': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required])
    })
    this.formAddUser = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'class': new FormControl(null, [Validators.required]),
      'login': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    })
  }

  public addEbook() {
    this.status = true;
    let ebook = new Ebook(this.formAddEbook.value.title, this.formAddEbook.value.link,
      this.formAddEbook.value.class, this.formAddEbook.value.description)
    this.message = 'Aguarde, enviando solicitação...';
    this.adminService.addEbook(ebook).subscribe(
      () => {
        this.message = 'Solicitação recebida com sucesso !!!'
        this.status = false;
      },
      () => {
        this.message = 'Erro na solicitação !!!'
        this.status = false;
      }
    )
  }
  public addUser() {
    this.status = true;
    let user = new User(this.formAddUser.value.name, this.formAddUser.value.class,
      this.formAddUser.value.login, this.formAddUser.value.password)
    this.message = 'Aguarde, enviando solicitação...';
    this.adminService.addUser(user).subscribe(
      () => {
        this.message = 'Solicitação recebida com sucesso !!!'
        this.status = false;
      },
      () => {
        this.message = 'Erro na solicitação !!!'
        this.status = false;
      }
    )
  }


}
