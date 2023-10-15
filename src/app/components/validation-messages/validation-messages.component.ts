import { Component, Input } from '@angular/core';
import { AbstractControl, UntypedFormGroup, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-validation-messages',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.scss']
})
export class ValidationMessagesComponent {

  @Input() formGroupValidation?: UntypedFormGroup;
  @Input() field?: string;

  get showValidationMessage(): boolean {
    return (this.abstractControl()?.invalid && this.abstractControl()?.touched) ?? false;
  }

  private abstractControl(): AbstractControl | undefined | null {
    if (this.field) {
      return this.formGroupValidation?.get(this.field);
    }
    if (!this.field) {
      return this.formGroupValidation as AbstractControl;
    }
    return undefined;
  }

  get errors(): ValidationErrors | undefined | null {
    return this.abstractControl()?.errors;
  }

}
