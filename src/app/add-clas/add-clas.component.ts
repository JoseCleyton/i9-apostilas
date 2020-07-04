import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Clas } from '../models/clas';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-add-clas',
  templateUrl: './add-clas.component.html',
  styleUrls: ['./add-clas.component.css']
})
export class AddClasComponent implements OnInit {
  public formAddClas: FormGroup;
  public status: boolean;
  public message: string = '';
  constructor(private adminService: AdminService) { }

  ngOnInit() {

    this.formAddClas = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'schedulle': new FormControl(null, [Validators.required]),
      'teacher': new FormControl(null, [Validators.required])
    })
  }
  public addClas() {
    this.status = true;
    let clas = new Clas(this.formAddClas.value.name, this.formAddClas.value.schedulle,
      this.formAddClas.value.teacher)
    this.message = 'Aguarde, enviando solicitação...';
    this.adminService.addClass(clas).subscribe(
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
  public clearForm() {
    this.formAddClas.reset();
  }

}
