import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dasboard-student',
  templateUrl: './dasboard-student.component.html',
  styleUrls: ['./dasboard-student.component.css']
})
export class DasboardStudentComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  public logout() {
    this.authService.logout();
  }
}
