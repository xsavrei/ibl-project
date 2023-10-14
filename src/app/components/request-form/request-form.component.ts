import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MessageType } from '../../domain';
import { CustomValidators } from '../../validators';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent {

  messageTypesValues = Object.values(MessageType);

  form = this.formBuilder.group({
    messageTypes: this.formBuilder.array<MessageType | null>([], [Validators.required, CustomValidators.atLeastOneValue]),
    airports: this.formBuilder.control<string[] | null>(null),
    countries: this.formBuilder.control<string[] | null>(null),
  }, { validators: CustomValidators.atLeastOneControl(Validators.required, ['airports', 'countries']) });

  constructor(private formBuilder: FormBuilder) {
    this.addValues();
  }

  getValuesFormArray(): FormArray {
    return this.form.get('messageTypes') as FormArray;
  }

  private addValues(): void {
    this.messageTypesValues?.forEach(() => {
      this.getValuesFormArray().push(this.formBuilder.control<string | null>(null));
    });

    this.form.updateValueAndValidity();
  }

}
