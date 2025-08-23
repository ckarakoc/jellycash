import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignUpValidators } from '../../validators/SignUpValidators';
import { RouterLink } from '@angular/router';

//todo: error validations and error messages.

@Component({
	selector: 'app-signup',
	imports: [
		FormsModule,
		ReactiveFormsModule,
		RouterLink
	],
	template: `
		<div class="flex items-center justify-center p-4 flex-1">
			<div class="bg-white rounded-xl p-6 w-full max-w-xl">
				<form [formGroup]="signupForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
					<div class="text-preset-1">Sign Up</div>

					<div class="flex flex-col">
						<label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
						<input id="name"
									 name="name"
									 type="text"
									 placeholder=""
									 formControlName="name"
									 class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jelly-blue focus:border-transparent">
						<div class="text-jelly-red text-sm self-end">
							@if (signupForm.controls.name.invalid && signupForm.controls.name.touched && signupForm.controls.name.hasError('required')) {
								<span>Name is required</span>
							} @else {
								<span class="invisible">.</span>
							}
						</div>
					</div>

					<div class="flex flex-col">
						<label for="email" class="text-gray-500 text-preset-5 font-bold">Email</label>
						<input id="email"
									 name="email"
									 type="email"
									 placeholder=""
									 formControlName="email"
									 autocomplete="username"
									 class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jelly-blue focus:border-transparent">
						<div class="text-jelly-red text-sm self-end">
							@if (signupForm.controls.email.touched && signupForm.controls.email.hasError('required')) {
								<span>Email is required</span>
							} @else if (signupForm.controls.email.touched && signupForm.controls.email.hasError('email')) {
								<span>Please enter a valid email</span>
							} @else {
								<span class="invisible">.</span>
							}
						</div>

					</div>

					<div class="flex flex-col">
						<label for="password" class="text-gray-500 text-preset-5 font-bold">Create Password</label>
						<div class="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-jelly-blue">
							<input id="password"
										 name="password"
										 type="password"
										 placeholder=""
										 formControlName="password"
										 autocomplete="new-password"
										 class="w-full px-3 py-2 focus:outline-none focus:border-transparent">
						</div>
						<div class="text-jelly-red text-sm self-end text-right">
							@if (signupForm.controls.password.touched && signupForm.controls.password.hasError('required')) {
								<span>Password is required</span>
							} @else if (signupForm.controls.password.touched && signupForm.controls.password.hasError('password')) {
								@if (signupForm.controls.password.getError('password')['lowercase']) {
									<span>Password must contain lowercase</span>
								} @else if (signupForm.controls.password.getError('password')['uppercase']) {
									<span>Password must contain uppercase</span>
								} @else if (signupForm.controls.password.getError('password')['number']) {
									<span>Password must contain number</span>
								} @else if (signupForm.controls.password.getError('password')['specialCharacter']) {
									<span>Password must contain special character</span>
								} @else {
									<span>Password must be at least 8 characters</span>
								}
							} @else {
								<span class="invisible">.</span>
							}
						</div>
					</div>

					<div class="flex flex-col">
						<label for="confirmPassword" class="text-gray-500 text-preset-5 font-bold">Confirm Password</label>
						<div class="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-jelly-blue">
							<input id="confirmPassword"
										 name="confirmPassword"
										 type="password"
										 placeholder=""
										 formControlName="confirmPassword"
										 autocomplete="new-password"
										 class="w-full px-3 py-2 focus:outline-none focus:border-transparent">
						</div>

						<div class="text-jelly-red text-sm self-end">
							@if (signupForm.controls.confirmPassword.touched && signupForm.controls.confirmPassword.hasError('required')) {
								<span>Please confirm your password</span>
							} @else if (signupForm.controls.confirmPassword.touched && signupForm.hasError('passwordsMatch')) {
								<span>Passwords do not match</span>
							} @else {
								<span class="invisible">.</span>
							}
						</div>
					</div>

					<button type="submit" [disabled]="!signupForm.valid"
									class="bg-black text-white text-preset-4 py-4 rounded-lg hover:bg-gray-500 hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300">
						Create Account
					</button>
				</form>

				<div class="text-preset-4 text-gray-500 font-light mt-4 justify-self-center">
					Already have an account? <a [routerLink]="['../login']" class="text-gray-900 text-preset-4 underline hover:text-gray-500 hover:cursor-pointer">Login</a>
				</div>
			</div>
		</div>
	`,
	styles: `
		:host {
			display: flex;
			flex: 1 1 auto; /* flex-1 (i.e. fill remaining space) */
		}
	`
})
export class Signup implements OnDestroy{

	private fb = inject(FormBuilder);

	signupForm = this.fb.group({
		name: ['', [Validators.required]],
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, SignUpValidators.password]],
		confirmPassword: ['', [Validators.required]]
	}, { validators: [SignUpValidators.passwordsMatch] });

	onSubmit() {

	}

	ngOnDestroy() {
		this.signupForm.reset();
	}
}
