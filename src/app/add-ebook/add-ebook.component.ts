import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Clas } from '../models/clas';
import { Ebook } from '../models/ebook';

@Component({
  selector: 'app-add-ebook',
  templateUrl: './add-ebook.component.html',
  styleUrls: ['./add-ebook.component.css']
})
export class AddEbookComponent implements OnInit {
  public formAddEbook: FormGroup;
  public status: boolean = false;
  public message: string = '';
  public classes: Clas[]

  constructor(private adminService: AdminService) { }
  ngOnInit() {

    this.adminService.getClasses().subscribe(
      (data: any) => {
        this.classes = data.classes;
      }
    )
    this.formAddEbook = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'link': new FormControl(null, [Validators.required]),
      'clas': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required])
    })
  }

  public addEbook() {
    this.status = true;
    let ebook = new Ebook(this.formAddEbook.value.title, this.formAddEbook.value.link,
      this.formAddEbook.value.clas, this.formAddEbook.value.description)
    this.message = 'Aguarde, enviando solicitação...';
    this.adminService.addEbook(ebook).subscribe(
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
    this.formAddEbook.reset();
  }

}
