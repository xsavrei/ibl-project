import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    messageTypes: this.formBuilder.control<MessageType[] | undefined>([], [Validators.required, CustomValidators.atLeastOneValue]),
    airports: this.formBuilder.control<string[] | undefined>(undefined),
    countries: this.formBuilder.control<string[] | undefined>(undefined),
  }, { validators: CustomValidators.atLeastOneControl(Validators.required, ['airports', 'countries']) });

  constructor(private formBuilder: FormBuilder) {
  }

}
