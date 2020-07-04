import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Clas } from '../models/clas';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  public classes: Clas[];
  public formAddUser: FormGroup;
  public status: boolean;
  public message: string;
  public messageLoading: string;
  public login: string;
  public password: string;
  public alert: boolean;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.alert = true;

    this.formAddUser = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'login': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'clas': new FormControl(null, [Validators.required]),
    })

    this.status = true;
    this.messageLoading = 'Aguarde. Gerando Login...'
    this.adminService.getTotalUsers().subscribe(
      (totalUsers: any) => {
        this.login = new Date().getFullYear() + '0' + totalUsers.totalUsers;
        this.formAddUser.get('login').setValue(this.login);
        this.formAddUser.get('password').setValue(this.login);

        this.adminService.getClasses().subscribe(
          (data: any) => {
            this.classes = data.classes;
            this.messageLoading = '';
            this.status = false;
          }
        )
      }
    )


  }
  public addUser() {
    this.status = true;
    let user = new User(this.formAddUser.value.name, this.formAddUser.value.clas,
      this.formAddUser.value.login, this.formAddUser.value.password);
    user.active = true;
    user.roles = 'student'
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
  public clearForm() {
    this.formAddUser.reset();
  }
  public isAlert() {
    this.alert = !this.alert;
  }
  public generatedNewLoginAndPassword() {
    this.status = true;
    this.messageLoading = 'Aguarde. Gerando Login...'
    this.adminService.getTotalUsers().subscribe(
      (totalUsers: any) => {
        this.login = new Date().getFullYear() + '0' + totalUsers.totalUsers;
        this.formAddUser.get('login').setValue(this.login);
        this.formAddUser.get('password').setValue(this.login);
        this.status = false;
        this.messageLoading = '';
      }
    )
  }
}
