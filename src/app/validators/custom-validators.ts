import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {

  static atLeastOneControl(validator: ValidatorFn, controls: string[]) {
    return (group: FormGroup) => {
      const hasAtLeastOne = group && group.controls && controls.some(control => !validator(group.controls[control]));
      if(!hasAtLeastOne) {
        controls.forEach(control => {
          group.controls[control].setErrors({ atLeastOneControl: true })
        })
      } else {
        controls.forEach(control => {
          group.controls[control].setErrors(null)
        })
      }
      return hasAtLeastOne ? null : { atLeastOneControl: true };
    }
  }

  static atLeastOneValue(control: AbstractControl): ValidationErrors | null {
    const values: Array<any> = control.value.isArray ? control.value : Object.values(control.value);
    return values?.some(Boolean) ? null : { atLeastOneValue: true };
  }
}

