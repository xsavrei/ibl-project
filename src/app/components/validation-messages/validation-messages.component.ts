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

  formControl?: AbstractControl<any, any> | null;

  get showValidationMessage(): boolean {
    return (this.abstractControl()?.invalid && this.abstractControl()?.touched) ?? false;
  }

  private abstractControl(): AbstractControl | undefined | null {
    if (this.field) {
      this.formControl = this.formGroupValidation?.get(this.field);
      return this.formGroupValidation?.get(this.field);
    }
    if (!this.field) {
      this.formControl = this.formGroupValidation;
      return this.formGroupValidation as AbstractControl;
    }
    return undefined;
  }

  get errors(): ValidationErrors | undefined | null {
    return this.abstractControl()?.errors;
  }

  get formattedAtLeastOneControlError() {
    if (this.formGroupValidation) {
      const showError = Object.values(this.formGroupValidation?.controls)
        .some(value => (value.errors?.atLeastOneControl) && value.touched);
      if (this.errors?.atLeastOneControl && showError) {
        return 'At least one of the ' + this.errors?.atLeastOneControl + ' should be filled';
      }
    }
    return null;
  }

}
