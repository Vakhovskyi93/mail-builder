import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'mb-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    },
  ],
})
export class InputComponent implements OnInit, ControlValueAccessor {
  value!: string | undefined;
  @Input() placeholder!: string;
  @Input() type!: string;
  constructor() {}

  ngOnInit(): void {
    if (!this.type) {
      this.type = 'text';
    }
  }
  // Function to call when the input is touched.
  onChange = (value: string | undefined) => {};
  // Function to call when the value changes.
  onTouched = (value: string | undefined) => {};

  inputChanged(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.writeValue(input?.value);
  }

  writeValue(value: string | undefined): void {
    this.value = value;
    this.onChange(value);
    this.onTouched(value);
  }

  registerOnChange(fn: (value: string | undefined) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
