import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VideoLesson } from '../models/videoLesson';
import { AdminService } from '../services/admin.service';
import { Clas } from '../models/clas';

@Component({
  selector: 'app-add-video-lesson',
  templateUrl: './add-video-lesson.component.html',
  styleUrls: ['./add-video-lesson.component.css']
})
export class AddVideoLessonComponent implements OnInit {
  public formAddVideoLesson: FormGroup;
  public status: boolean = false;
  public message: string = '';
  public classes: Clas[]

  constructor(private adminService: AdminService) { }

  ngOnInit() {

    this.adminService.getClasses().subscribe(
      (data:any) => {
        this.classes = data.classes;
      }
    )
    this.formAddVideoLesson = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'link': new FormControl(null, [Validators.required]),
      'clas': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required])
    })
  }

  public addVideoLesson() {
    this.status = true;
    let videoLesson = new VideoLesson(this.formAddVideoLesson.value.title, this.formAddVideoLesson.value.link,
      this.formAddVideoLesson.value.clas, this.formAddVideoLesson.value.description)
    this.message = 'Aguarde, enviando solicitação...';
    this.adminService.addVideoLesson(videoLesson).subscribe(
      (data) => {
        this.message = 'Solicitação recebida com sucesso !!!'
        this.status = false;
      },
      () => {
        this.message = 'Erro na solicitação !!!'
        this.status = false;
      }
    )
  }
  public clearForm() {
    this.formAddVideoLesson.reset();
  }
}
