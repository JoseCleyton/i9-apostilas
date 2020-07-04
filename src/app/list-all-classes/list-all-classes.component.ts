import { Component, OnInit } from '@angular/core';
import { Clas } from '../models/clas';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-list-all-classes',
  templateUrl: './list-all-classes.component.html',
  styleUrls: ['./list-all-classes.component.css']
})
export class ListAllClassesComponent implements OnInit {
  public clas: Clas;
  public formEditClas: FormGroup;
  public classes: Clas[];
  public status: boolean;
  public message: string
  public loadingPage: boolean;
  public loadingMessage: string;

  constructor(private adminService: AdminService) { }

  ngOnInit() {

    this.loadingPage = true;
    this.loadingMessage = 'Aguarde. Buscando dados...';

    this.adminService.getClasses().subscribe(
      (data: any) => {
        this.classes = data.classes;
        this.loadingPage = false;
        this.loadingMessage = '';
      },
      () => {
        this.message = 'Erro ao buscar dados !!!';
        this.loadingPage = false;
      }
    )
    this.formEditClas = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'schedulle': new FormControl(null, [Validators.required]),
      'teacher': new FormControl(null, [Validators.required]),
    })
  }

  public selectClas(_id: string) {
    this.clas = this.classes.find((c) => {
      return c._id === _id
    })
    this.formEditClas.get('name').setValue(this.clas.name);
    this.formEditClas.get('schedulle').setValue(this.clas.schedulle);
    this.formEditClas.get('teacher').setValue(this.clas.teacher);
  }
  public updateClas() {
    this.status = true;
    let clas = new Clas(this.formEditClas.value.name, this.formEditClas.value.schedulle, this.formEditClas.value.teacher);
    clas._id = this.clas._id;
    this.message = 'Aguarde, enviando solicitação...';
    this.adminService.updateClas(clas).subscribe(
      () => {
        this.message = 'Solicitação recebida com sucesso !!!'
        this.status = false;
        this.adminService.getClasses().subscribe((data: any) => this.classes = data.classes);
      },
      () => {
        this.message = 'Erro na solicitação !!!'
        this.status = false;
      }
    )
  }
  public clearForm() {
    this.formEditClas.reset();
  }
}
