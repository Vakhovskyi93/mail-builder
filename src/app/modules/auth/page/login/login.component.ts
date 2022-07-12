import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UserService } from 'src/app/services/user.service';
import { IUserData } from '../../../../repository/interfaces';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  userInfoSub!: Subscription;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private snackbar: SnackBarService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    this.userInfoSub.unsubscribe();
  }

  autorizationInfo(data: IUserData) {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    this.userInfoSub = this.authService.login(formData).subscribe(
      (res) => {
        this.userService.setUserInfo(res.data),
          this.router.navigateByUrl('/projects');
      },
      (err) => {
        this.snackbar.openSnackBar({
          message: `Wrong Email or Password`,
          class: 'danger',
        });
      }
    );
  }
}
