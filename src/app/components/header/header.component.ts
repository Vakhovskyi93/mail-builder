import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'mb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  logoColor = 'blue';
  icon = 'logo';
  name?: string | null;
  constructor(private userServoce: UserService, private router: Router) {}

  ngOnInit() {
    this.userServoce.userName.subscribe((data) => (this.name = data?.name));
  }

  redirect(e: Event) {
    this.router.navigate(['/']);
  }

  logout() {
    this.userServoce.removeToken();
  }
}
