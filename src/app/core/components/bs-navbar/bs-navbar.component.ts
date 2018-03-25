import { IAppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {


  navbarCollapsed: boolean;
  appUser: IAppUser = {} as IAppUser;

  constructor(private authService: AuthService) { }

  async ngOnInit() {
    this.authService.appUser$.subscribe(user => this.appUser = user);
  }

  logout() {
    this.authService.logout();
  }

}
