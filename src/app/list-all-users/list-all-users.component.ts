import { Component, OnInit } from "@angular/core";
import { User } from "../models/user";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AdminService } from "../services/admin.service";
import { Clas } from "../models/clas";

@Component({
  selector: "app-list-all-users",
  templateUrl: "./list-all-users.component.html",
  styleUrls: ["./list-all-users.component.css"],
})
export class ListAllUsersComponent implements OnInit {
  public user: User;
  public formEditUser: FormGroup;
  public users: User[];
  public status: boolean;
  public message: string;
  public loadingPage: boolean;
  public classes: Clas[];
  public loadingMessage: string;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadingPage = true;
    this.loadingMessage = "Aguarde. Buscando dados...";

    this.adminService.getClasses().subscribe((data: any) => {
      this.classes = data.classes;
    });

    this.adminService.getUsers().subscribe(
      (users: any) => {
        let us: User[] = [];
        this.users = users.users;
        this.users.filter((u) => {
          if (u.roles === "student") {
            us.push(u);
          }
        });
        this.users = us;
        this.loadingMessage = "";
        this.loadingPage = false;
      },
      () => {
        this.loadingPage = false;
        this.loadingMessage = "Erro ao buscar dados !!!";
      }
    );
    this.formEditUser = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      clas: new FormControl(null, [Validators.required]),
    });
  }
  public selectUser(_id: string) {
    this.user = this.users.find((v) => {
      return v._id === _id;
    });
    this.formEditUser.get("name").setValue(this.user.name);
    this.formEditUser.get("clas").setValue(this.user.clas);
  }
  public updateUser() {
    this.status = true;
    let user = {
      _id: this.user._id,
      name: this.formEditUser.value.name,
      clas: this.formEditUser.value.clas,
    };

    this.message = "Aguarde, enviando solicitação...";
    this.adminService.updateUser(user).subscribe(
      () => {
        this.message = "Solicitação recebida com sucesso !!!";
        this.status = false;
        this.adminService
          .getUsers()
          .subscribe((data: any) => (this.users = data.users));
      },
      () => {
        this.message = "Erro na solicitação !!!";
        this.status = false;
      }
    );
  }
  public clearForm() {
    this.formEditUser.reset();
  }

  public deletarUsuario() {
    this.adminService.deleteUser(this.user._id).subscribe(
      () => {
        this.message = "Solicitação recebida com sucesso !!!";
        this.status = false;
        this.adminService
          .getUsers()
          .subscribe((data: any) => (this.users = data.users));
      },
      () => {
        this.message = "Erro na solicitação !!!";
        this.status = false;
      }
    );
  }
}
