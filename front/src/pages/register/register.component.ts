import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})
export class LoginComponent {

    loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.loginForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(5)]],
            description: [''],
        });
    }
    
    logForm() {
        console.log(this.loginForm.value)
    }
}