import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
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

  onTouched?: () => void;
  onChange?: (value: string[] | null) => void;

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
    this.inputValue = event.target.value;
    if ((event.key === ' ' || event.key === 'Enter') && this.inputValue.trim() !== '') {
      this.values.push(this.inputValue.trim());
      this.inputValue = '';
      if (this.values?.length && this.onChange && this.onTouched) {
        this.onChange(this.values);
        this.onTouched();
      }
    }
  }

  removeItem() {
    this.values.pop();
    if (this.onTouched) {
      this.onTouched();
    }
    this.formControl?.markAsTouched({ onlySelf: false });
    this.formControl?.updateValueAndValidity({ onlySelf: false, emitEvent: false });
  }

  //workaround to get formcontrol for form validation
  validate(control: AbstractControl): ValidationErrors | null {
    this.formControl = control;
    return null;
  }


}
