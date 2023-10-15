import { Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormArray, NG_VALUE_ACCESSOR, NonNullableFormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkbox-list-input',
  templateUrl: './checkbox-list-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxListInputComponent),
      multi: true
    }
  ]
})
export class CheckboxListInputComponent<T> implements OnChanges, OnInit, OnDestroy, ControlValueAccessor {

  @Input()
  values?: T[];

  disableWholeFormWhenDisabled = true;
  isDisabled = false;
  formValueChangesSubscription?: Subscription;

  protected onTouched?: () => void;
  protected onChange?: (value: T[] | null) => void;

  form = this.formBuilder.group({
    values: this.formBuilder.array([])
  });

  constructor(private formBuilder: NonNullableFormBuilder) {
  }

  ngOnInit() {
    this.formValueChangesSubscription = this.form.valueChanges
      .subscribe(() => {
        this.formValueChanged();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.values?.currentValue) {
      this.addValues();
    }
  }

  ngOnDestroy(): void {
    this.formValueChangesSubscription?.unsubscribe();
  }

  getValuesFormArray(): FormArray {
    return this.form.get('values') as FormArray;
  }

  addValues(): void {
    this.values?.forEach(() => {
      this.getValuesFormArray().push(this.formBuilder.control<string | undefined>(undefined));
    });

    this.form.updateValueAndValidity();
  }

  formValueChanged(): void {
    let result: (T[] | null) = this.form.valid
      ? this.createValueFromForm() ?? null
      : null;

    if (result && this.onTouched && !this.isDisabled) {
      this.onTouched();
    }

    if (this.onChange && !this.isDisabled) {
      this.onChange(result);
    }
  }

  createValueFromForm(): T[] {
    const preparedValues: T[] = [];
    const preparedValuesFormArray: FormArray = this.getValuesFormArray();
    preparedValuesFormArray.controls?.forEach((control, index) => {
      if (control.value && this.values) {
        preparedValues.push(this.values[index]);
      }
    });

    return preparedValues;
  }

  writeValue(data: T[]): void {
    if (data) {
      data.forEach((value: T) => {
        const index = this.values?.findIndex(reason => reason === value);
        if (index !== undefined && index !== -1) {
          this.getValuesFormArray().controls[index]?.setValue(value);
        }
      });

      this.form.updateValueAndValidity();
    }
  }

  registerOnChange(fn: (value: T[] | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    if (this.disableWholeFormWhenDisabled) {
      if (isDisabled) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    }
  }
}
