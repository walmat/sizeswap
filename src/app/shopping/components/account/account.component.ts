import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from 'shared/services/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {UserService} from 'shared/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {

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

  ngOnDestroy() {
      this.userSubscription.unsubscribe();
  }

  save(profile) {
      this.userService.save(this.userId, this.userName, profile.addressLine1, profile.addressLine2,
          profile.city, profile.state, profile.zip)
          .then(ref => {
              this.router.navigate(['']);
          })
          .catch(err => {
              console.log(err);
          });
      this.disableBtn = true;
  }

}
