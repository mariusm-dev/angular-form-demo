import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { lowerUpperCaseValidator } from 'src/app/custom-validators/lower-upper-case-validator';
import { forbidenWrodsValidator } from 'src/app/custom-validators/forbiden-wrods-validator';
import { whiteSpaceValidator } from 'src/app/custom-validators/white-space-validator';
import { UserRequest, UserResponse } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { strongEmailValidator } from 'src/app/custom-validators/strong-email-validator';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

    @Output() userResponse = new EventEmitter<UserResponse>();

    public signUpForm: FormGroup = this.getSignUpFormGroup();
    public submited = false;
    public saveInProgress = false;
    public firstNameChangeSubscription = new Subscription();
    public lastNameChangeSubscription = new Subscription();
    private passwrodDefaultValidators = [Validators.required, whiteSpaceValidator(), Validators.minLength(8), lowerUpperCaseValidator()];

    constructor(
        private formBuilder: FormBuilder,
        private userService: UsersService,
        private messageService: MessageService
    ) {
    }

    ngOnInit(): void {
        this.subscribeFirstNameChanges();
        this.subscribeLastNameChanges();
    }

    ngOnDestroy(): void {
        this.firstNameChangeSubscription?.unsubscribe();
        this.lastNameChangeSubscription?.unsubscribe();
    }

    public async submit(): Promise<void> {
        this.submited = true;
        if (this.signUpForm.invalid) {
            Object.keys(this.signUpForm.controls).forEach(key => {
                this.signUpForm.controls[key].markAsDirty();
            });
            return;
        }
        const user: UserRequest = Object.assign({}, this.signUpForm.value);
        try {
            this.signUpForm.disable();
            this.saveInProgress = true;
            const result = await this.userService.saveUser(user).toPromise();
            this.userResponse.emit(result);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User added successfully' });
        } catch (error) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User could not be saved!' });
        } finally {
            this.saveInProgress = false;
            this.signUpForm.enable();
            this.reset();
        }
    }

    public reset(): void {
        this.signUpForm.reset();
        this.submited = false;
    }


    private getSignUpFormGroup(): FormGroup {
        return this.formBuilder.group({
            firstName: new FormControl(null, [Validators.required, whiteSpaceValidator()], null),
            lastName: new FormControl(null, [Validators.required, whiteSpaceValidator()], null),
            email: new FormControl(null, [Validators.required, whiteSpaceValidator(), strongEmailValidator()], null),
            password: new FormControl(null, [Validators.required, whiteSpaceValidator(), Validators.minLength(8),
            lowerUpperCaseValidator()], null),
        });
    }

    private subscribeFirstNameChanges(): void {
        this.firstNameChangeSubscription = this.signUpForm.controls?.['firstName']?.valueChanges.subscribe(newValue => {
            const forbiddenWords = [newValue, this.signUpForm.controls?.['lastName']?.value];
            this.uppdatePasswordValidators(forbiddenWords);
        });
    }

    private subscribeLastNameChanges(): void {
        this.firstNameChangeSubscription = this.signUpForm.controls?.['lastName']?.valueChanges.subscribe(newValue => {
            const forbiddenWords = [newValue, this.signUpForm.controls?.['firstName']?.value];
            this.uppdatePasswordValidators(forbiddenWords);
        });
    }

    private uppdatePasswordValidators(forbiddenWords: string[]): void {
        this.signUpForm.controls['password'].setValidators(this.passwrodDefaultValidators.concat(forbidenWrodsValidator(forbiddenWords)));
        this.signUpForm.controls['password'].updateValueAndValidity();
    }
}
