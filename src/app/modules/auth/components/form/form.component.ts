import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IUserData } from '../../../../repository/interfaces';
import { PATTERN_FOR_EMAIL } from 'src/app/app.constants';
@Component({
  selector: 'mb-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form!: FormGroup;

  emailPlaceholder = 'Please enter your email';
  passwordPlaceholder = 'Please enter your password';
  inputTypePass = 'password';

  @Output() autorizationInfo: EventEmitter<IUserData> =
    new EventEmitter<IUserData>();
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.pattern(PATTERN_FOR_EMAIL)]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.autorizationInfo.emit(this.form.value);
  }
}
