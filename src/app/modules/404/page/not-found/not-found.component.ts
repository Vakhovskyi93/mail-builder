import { Component, OnInit } from '@angular/core';
import { BACK_BUTTON_TEXT } from '../../constant';

@Component({
  selector: 'app-not-found',
  template: `<mb-header></mb-header>
    <div class="container flex-col">
      <h1 style="text-align: center;">Something went wrong :(</h1>
      <mb-action-button
        routerLink="/projects"
        [value]="value"
      ></mb-action-button>
    </div> `,
  styles: [
    `
      h1 {
        padding: 30px 30px 20px 30px;
      }
    `,
  ],
})
export class NotFoundComponent implements OnInit {
  value = BACK_BUTTON_TEXT;
  constructor() {}

  ngOnInit(): void {}
}
