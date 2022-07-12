import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'mb-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
})
export class ActionButtonComponent implements OnInit {
  @Input() value!: string;
  @Input() icon?: string;
  @Input() disabled!: boolean;
  @Output() submit: EventEmitter<void> = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {
    this.value ? null : (this.value = 'Login');
  }

  action() {
    this.submit.emit();
  }
}
