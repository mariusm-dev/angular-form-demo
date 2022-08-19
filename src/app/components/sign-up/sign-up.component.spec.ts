import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
    let component: SignUpComponent;
    let fixture: ComponentFixture<SignUpComponent>;

    let userServiceSpy = jasmine.createSpyObj('UsersService', ['saveUser']);
    userServiceSpy.saveUser.and.returnValue(of());

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule,],
            declarations: [SignUpComponent],
            providers: [{ provide: UsersService, useValue: userServiceSpy }, MessageService]
        })
            .compileComponents();

        fixture = TestBed.createComponent(SignUpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should require all fields to have values', () => {
        component.signUpForm.setValue({
            "firstName": "",
            "lastName": "",
            "email": "",
            "password": ""
        });

        expect(component.signUpForm.valid).toEqual(false);
    });

    it('password should be a minimum of eight characters', () => {
        component.signUpForm.setValue({
            "firstName": "a",
            "lastName": "b",
            "email": "a@b.com",
            "password": "1234567"
        });

        expect(component.signUpForm.controls['password'].errors?.['minlength']).toBeTruthy();
    });

    it('password should contain lower and uppercase letters', () => {
        component.signUpForm.setValue({
            "firstName": "a",
            "lastName": "b",
            "email": "a@b.com",
            "password": "aaaa"
        });

        expect(component.signUpForm.controls['password'].errors?.['lowerUpperCaseValidator']).toBeTruthy();
    });

    it('passwrod should not contain user first or last name', () => {
        component.signUpForm.setValue({
            "firstName": "Marius",
            "lastName": "Marin",
            "email": "a@b.com",
            "password": "Marius"
        });

        expect(component.signUpForm.controls['password'].errors?.['forbiddenWords']).toBeTruthy();
    });

    it('email should be a valid value', () => {
        component.signUpForm.setValue({
            "firstName": "Marius",
            "lastName": "Marin",
            "email": "a@b",
            "password": "Marius"
        });

        expect(component.signUpForm.controls['email'].valid).toBeFalsy();
    });


    it('should allow data to be send to user service', () => {
        const formData = {
            "firstName": "a",
            "lastName": "b",
            "email": "aaa@b.com",
            "password": "123456789Cx"
        };
        component.signUpForm.setValue(formData);
        component.submit();

        expect(userServiceSpy.saveUser).toHaveBeenCalledWith(formData);
    })
});
