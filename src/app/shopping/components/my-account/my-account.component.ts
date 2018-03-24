import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from 'shared/services/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {UserService} from 'shared/services/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  disableBtn: boolean;
  userId: string;
  userName: string;
  userSubscription: Subscription;

  constructor(
      private auth: AuthService,
      private router: Router,
      private userService: UserService) { }

  async ngOnInit() {
      this.userSubscription = this.auth.user$
          .subscribe(user => {
              this.userId = user.uid;
              this.userName = user.displayName || user.email;
          });
  }

  save(profile) {
      this.userService.save(profile.addressLine1, profile.addressLine2,
          profile.city, profile.state, profile.zip, this.userId)
          .then(ref => {
              this.router.navigate(['']);
          })
          .catch(err => {
              console.log(err);
          });
      this.disableBtn = true;
  }

}
