import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { TermsValidator } from '../../common/validators/termsValidator';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html'
})
export class RegisterComponent {

    registerForm: FormGroup;
    termsAgree: boolean;

    constructor(private formBuilder: FormBuilder) {
        this.termsAgree = false;
        this.registerForm = new FormGroup({
		name: new FormControl('', Validators.required),
		lastname: new FormControl('', Validators.required),
		email: new FormControl('', Validators.compose([
			Validators.required,
			Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
		])),
		phone: new FormControl('', Validators.compose([
			Validators.pattern('^\\d+$'),
			Validators.required
		])),
                birthDate: new FormControl('', Validators.required),
                actualCity:  new FormControl('', Validators.required),
                bornCity:  new FormControl('', Validators.required),
                state: new FormControl('A', Validators.required),
		gender: new FormControl('M', Validators.required),
		password: new FormControl('', Validators.compose([
			Validators.minLength(6),
			Validators.required,
			Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
		])),
		confirmPassword: new FormControl('', Validators.required),
		termsAgree: new FormControl(false, Validators.compose([
                            Validators.required,
                            TermsValidator.isValid
                ]))
	});
    }
    
    logForm() {
        console.log(this.registerForm.value)
    }
}