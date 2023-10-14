import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

export class CustomValidators {

  static atLeastOneControl(validator: ValidatorFn, controls: string[]) {
    return (group: FormGroup) => {

      const hasAtLeastOne = group && group.controls && controls.some(k => !validator(group.controls[k]));

      return hasAtLeastOne ? null : {
        atLeastOneControl: true,
      };
    }
  }

  static atLeastOneValue(control: AbstractControl): ValidationErrors | null {
    const values: Array<any> = control.value.isArray ? control.value : Object.values(control.value);
    return values?.some(Boolean) ? null : { atLeastOneValue: true };
  }
}

