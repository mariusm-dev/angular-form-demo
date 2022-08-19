

import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function strongEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value:string = control?.value?.toString();
        if (!value) {
            return null;
        }

        const isValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value);

        return !isValid ? { invalidEmail: true } : null;
    }
}