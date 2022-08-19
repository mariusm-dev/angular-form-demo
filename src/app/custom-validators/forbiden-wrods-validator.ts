import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function forbidenWrodsValidator(forbidenWords: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value: string = control?.value?.toString();
        if (!value) {
            return null;
        }

        const containsForbiddenWords = forbidenWords ? forbidenWords.some(w => value.toLowerCase().indexOf(w?.toLowerCase()) !== -1) : false;

        return containsForbiddenWords ? { forbiddenWords: true } : null;
    }
}

