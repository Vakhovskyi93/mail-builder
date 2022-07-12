import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'mb-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
  @Input() isLarge?: boolean;
  @Input() iconColor = 'white';
  @Output() action: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  submit() {
    this.action.emit();
  }
}
