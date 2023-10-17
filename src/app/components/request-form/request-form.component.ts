import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import * as uuid from 'uuid';
import { MessageType, WeatherRequest } from '../../domain';
import { CustomValidators } from '../../validators';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestFormComponent {

  @Output()
  formSubmit = new EventEmitter<WeatherRequest>();

  messageTypesValues = Object.values(MessageType);

  form = this.formBuilder.group({
    id: this.formBuilder.control(uuid.v4()),
    messageTypes: this.formBuilder.control<MessageType[] | null>([], [CustomValidators.atLeastOneValue]),
    airports: this.formBuilder.control<string[] | null>(null),
    countries: this.formBuilder.control<string[] | null>(null),
  }, { validators: CustomValidators.atLeastOneControl(Validators.required, ['airports', 'countries']) });

  constructor(private formBuilder: FormBuilder) {
  }

  onFormSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(new WeatherRequest({
        briefingId: this.form.value.id,
        reportTypes: this.form.value.messageTypes,
        stations: this.form.value.airports,
        countries: this.form.value.countries
      }));
    } else {
      this.markAllFormFieldsAsTouched(this.form);
    }
  }

  private markAllFormFieldsAsTouched(formControl: UntypedFormGroup | AbstractControl) {
    if (formControl instanceof UntypedFormGroup) {
      const formGroup = formControl as UntypedFormGroup;
      Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof UntypedFormControl) {
          this.markSingleControl(control);
        } else if (control instanceof UntypedFormGroup) {
          this.markAllFormFieldsAsTouched(control);
        } else if (control instanceof UntypedFormArray) {
          (control as UntypedFormArray).controls
            .forEach(control => this.markAllFormFieldsAsTouched(control));
        }
      });
    }
  }

  private markSingleControl(formControl: AbstractControl) {
    formControl.markAsTouched({ onlySelf: false });
    formControl.updateValueAndValidity({ onlySelf: false, emitEvent: false });
  }
}
