import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RegisterComponent } from '../register/register.component'; 

@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})
export class LoginComponent {
    
    loginForm: FormGroup;
    registerComponent = RegisterComponent;

    constructor(private formBuilder: FormBuilder) {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.minLength(5) ]],
            contrasenia: ['', [Validators.required]],
        });
    } 
    
    logForm() {
        console.log(this.loginForm.value)
    }
}