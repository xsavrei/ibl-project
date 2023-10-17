import { Component, ElementRef, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';

@Component({
  selector: 'app-multi-input',
  templateUrl: './multi-input.component.html',
  styleUrls: ['./multi-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MultiInputComponent),
      multi: true
    }
  ]
})
export class MultiInputComponent implements ControlValueAccessor, Validator {

  inputValue: string = '';
  values: string[] = [];
  formControl?: AbstractControl;
  elementRef?: ElementRef;

  onTouched?: () => void;
  onChange?: (value: string[] | null) => void;

  constructor(elRef: ElementRef) {
    this.elementRef = elRef;
  }

  registerOnChange(fn: (value: string[] | null) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: string) {
    if (value) {
      this.inputValue = value;
    }
  }

  onKeyUp(event: any) {
    if ((event.key === 'Backspace') && this.inputValue.trim() === '') {
      this.values.pop();
    }
    this.inputValue = event.target.value;
    if ((event.key === ' ' || event.key === 'Enter') && this.inputValue.trim() !== '') {
      this.values.push(this.inputValue.trim());
      this.inputValue = '';
    }
    if (this.values?.length && this.onChange && this.onTouched) {
      this.onChange(this.values);
      this.onTouched();
    }
  }

  //workaround to set/unset multi-input 'focus' without losing focus on native input
  onInputFocus() {
    this.elementRef?.nativeElement.setAttribute('style', 'border-color: #86b7fe; box-shadow:0 0 0 0.25rem rgba(13, 110, 253, 0.25)');
  }

  onInputBlur() {
    this.elementRef?.nativeElement.setAttribute('style', '');
    if (this.inputValue.trim() !== '') {
      this.values.push(this.inputValue.trim());
      this.inputValue = '';
    }
    if (this.values?.length && this.onChange) {
      this.onChange(this.values);
    }
    if (this.onTouched) {
      this.onTouched();
    }
  }

  removeItem(i: number) {
    this.values.splice(i, 1);
    if (this.onTouched) {
      this.onTouched();
    }
    this.formControl?.updateValueAndValidity({ onlySelf: false, emitEvent: false });
  }

  //workaround to get formcontrol for form validation
  validate(control: AbstractControl): ValidationErrors | null {
    this.formControl = control;
    return null;
  }


}
