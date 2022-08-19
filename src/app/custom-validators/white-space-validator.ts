import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function whiteSpaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!value) {
            return null;
        }

        const isWhiteSpace = value.toString().trim().length === 0;
        return isWhiteSpace ? { whitespace: true } : null;
    }
}