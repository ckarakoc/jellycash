import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class SignUpValidators {

	static hasNumber(control: AbstractControl): ValidationErrors | null {
		return control.value && !/[0-9]/.test(control.value)
			? { number: true }
			: null;
	}


	static hasUpperCase(control: AbstractControl): ValidationErrors | null {
		return control.value && !/[A-Z]/.test(control.value)
			? { uppercase: true }
			: null;
	}


	static hasLowerCase(control: AbstractControl): ValidationErrors | null {
		return control.value && !/[a-z]/.test(control.value)
			? { lowercase: true }
			: null;
	}

	static hasSpecialCharacter(control: AbstractControl): ValidationErrors | null {
		return control.value && !/[!@#$%^&*]/.test(control.value)
			? { specialCharacter: true }
			: null;
	}


	static hasMinLength(control: AbstractControl): ValidationErrors | null {
		return control.value && !(control.value.length >= 8)
			? { minLength: true }
			: null;
	}

	static password(control: AbstractControl): ValidationErrors | null {
		const errors: ValidationErrors = {};

		if (SignUpValidators.hasLowerCase(control)) errors['lowercase'] = true;
		if (SignUpValidators.hasUpperCase(control)) errors['uppercase'] = true;
		if (SignUpValidators.hasNumber(control)) errors['number'] = true;
		if (SignUpValidators.hasSpecialCharacter(control)) errors['specialCharacter'] = true;
		if (SignUpValidators.hasMinLength(control)) errors['minLength'] = true;

		return Object.keys(errors).length > 0 ? { password: errors } : null;
	}


	static passwordsMatch(control: AbstractControl): ValidationErrors | null {
		const password = control.get('password');
		const confirmPassword = control.get('confirmPassword');

		if (!password || !confirmPassword || !password.value || !confirmPassword.value) {
			return null;
		}

		return password.value !== confirmPassword.value
			? { passwordsMatch: true }
			: null;
	}
}
