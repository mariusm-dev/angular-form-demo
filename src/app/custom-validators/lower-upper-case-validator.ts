import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function lowerUpperCaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value:string = control?.value?.toString();
        if (!value) {
            return null;
        }

        const hasUpperCase = /[A-Z]+/.test(value);
        const hasLowerCase = /[a-z]+/.test(value);
        const isValid = hasUpperCase && hasLowerCase;

        return !isValid ? { lowerUpperCaseValidator: true } : null;
    }
}