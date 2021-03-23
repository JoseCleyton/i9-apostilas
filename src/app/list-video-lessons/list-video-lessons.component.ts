import { Component, OnInit } from "@angular/core";
import { AdminService } from "../services/admin.service";
import { VideoLesson } from "../models/videoLesson";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Clas } from "../models/clas";

@Component({
  selector: "app-list-video-lessons",
  templateUrl: "./list-video-lessons.component.html",
  styleUrls: ["./list-video-lessons.component.css"],
})
export class ListVideoLessonsComponent implements OnInit {
  public message: string = "";
  public status: boolean;
  public videosLesson: VideoLesson[];
  public videoLesson: VideoLesson;
  public formEditVideoLesson: FormGroup;
  public classes: Clas[];
  public loadingPage: boolean;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadingPage = true;
    this.message = "Aguarde. Buscando dados...";
    this.adminService.getClasses().subscribe((data: any) => {
      this.classes = data.clas;
    });

    this.adminService.getVideosLesson().subscribe(
      (data: any) => {
        this.videosLesson = data.videosLesson;
        this.message = "";
        this.loadingPage = false;
      },
      () => {
        this.loadingPage = false;
        this.message = "Erro ao buscar dados !!!";
      }
    );
    this.formEditVideoLesson = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      link: new FormControl(null, [Validators.required]),
      clas: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
  }

  public selectVideoLesson(_id: string) {
    this.videoLesson = this.videosLesson.find((v) => {
      return v._id === _id;
    });
    this.formEditVideoLesson.get("title").setValue(this.videoLesson.title);
    this.formEditVideoLesson.get("link").setValue(this.videoLesson.link);
    this.formEditVideoLesson
      .get("description")
      .setValue(this.videoLesson.description);
  }

  public updateVideoLesson() {
    this.status = true;
    let videoLesson = new VideoLesson(
      this.formEditVideoLesson.value.title,
      this.formEditVideoLesson.value.link,
      this.videoLesson.clas,
      this.formEditVideoLesson.value.description
    );
    videoLesson._id = this.videoLesson._id;
    this.message = "Aguarde, enviando solicitação...";
    this.adminService.updateVideoLesson(videoLesson).subscribe(
      () => {
        this.message = "Solicitação recebida com sucesso !!!";
        this.status = false;
        this.adminService
          .getVideosLesson()
          .subscribe((data: any) => (this.videosLesson = data.videosLesson));
      },
      () => {
        this.message = "Erro na solicitação !!!";
        this.status = false;
      }
    );
  }
  public clearForm() {
    this.formEditVideoLesson.reset();
  }
  public openLink(link: string) {
    window.open(link, "_blank");
  }
}
