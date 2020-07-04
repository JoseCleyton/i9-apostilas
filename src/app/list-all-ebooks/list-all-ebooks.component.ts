import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Ebook } from '../models/ebook';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-list-all-ebooks',
  templateUrl: './list-all-ebooks.component.html',
  styleUrls: ['./list-all-ebooks.component.css']
})
export class ListAllEbooksComponent implements OnInit {
  public ebooks: Ebook[];
  public formEditEbook: FormGroup;
  public ebook: Ebook;
  public status: boolean;
  public message: string;
  public loadingPage: boolean;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.loadingPage = true;
    this.message = 'Aguarde. Buscando dados...';
    this.adminService.getEbooks().subscribe(
      (data: any) => {
        this.ebooks = data.ebooks;
        this.loadingPage = false;
        this.message = '';
      },
      () => {
        this.loadingPage = false;
        this.message = 'Erro ao buscar dados !!!';
      }
    )

    this.formEditEbook = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'link': new FormControl(null, [Validators.required]),
      'clas': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required])
    })
  }


  public selectebook(_id: string) {
    this.ebook = this.ebooks.find((v) => {
      return v._id === _id
    })
    this.formEditEbook.get('title').setValue(this.ebook.title);
    this.formEditEbook.get('link').setValue(this.ebook.link);
    this.formEditEbook.get('description').setValue(this.ebook.description);

  }

  public updatebook() {
    this.status = true;
    let ebook = new Ebook(this.formEditEbook.value.title, this.formEditEbook.value.link, this.ebook.clas, this.formEditEbook.value.description);
    ebook._id = this.ebook._id;
    this.message = 'Aguarde, enviando solicitação...';
    this.adminService.updateEbook(ebook).subscribe(
      () => {
        this.message = 'Solicitação recebida com sucesso !!!'
        this.status = false;
        this.adminService.getEbooks().subscribe((data: any) => this.ebooks = data.ebooks);
      },
      () => {
        this.message = 'Erro na solicitação !!!'
        this.status = false;
      }
    )
  }

  public clearForm() {
    this.formEditEbook.reset();
  }
  public openLink(link: string) {
    window.open("//" + link, '_blank');
  }
}
