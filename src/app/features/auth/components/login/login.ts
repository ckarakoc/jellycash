import { Component, inject, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignUpValidators } from '../../validators/SignUpValidators';

@Component({
	selector: 'app-login',
	imports: [
		RouterLink,
		ReactiveFormsModule
	],
	template: `
		<div class="flex items-center justify-center p-4 flex-1">
			<div class="bg-white rounded-xl p-6 w-full max-w-xl">
				<form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
					<div class="text-preset-1">Login</div>
					<div class="">
						<label for="email" class="text-gray-500 text-preset-5 font-bold">Email</label>
						<input id="email"
									 name="email"
									 type="text"
									 placeholder=""
									 formControlName="email"
									 autocomplete="username"
									 class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jelly-blue focus:border-transparent">
					</div>

					<div class="">
						<label for="password" class="text-gray-500 text-preset-5 font-bold">Password</label>
						<div class="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-jelly-blue">
							<input id="password"
										 name="password"
										 [type]="passwordInputType()"
										 placeholder=""
										 formControlName="password"
										 autocomplete="current-password"
										 class="w-full px-3 py-2 focus:outline-none focus:border-transparent">
							<div class="p-3 hover:cursor-pointer" (click)="togglePwdInputType()">
								@if (passwordInputType() === 'text') {
									<svg height="12" viewBox="0 0 16 12" width="16">
										<path
											d="m6.04249 1.61686c-.02952-.03235-.05003-.07189-.05948-.11466-.00944-.04276-.00748-.08726.00569-.12903.01316-.04178.03707-.07936.06933-.10898.03225-.02963.07173-.05026.11446-.05983.59947-.13707 1.21257-.205631 1.8275-.204379 2.18001 0 4.16061.828749 5.72871 2.396879 1.1769 1.17687 1.7063 2.35125 1.7282 2.40062.0284.06395.0431.13315.0431.20313s-.0147.13918-.0431.20312c-.0219.04938-.5513 1.22313-1.7282 2.4-.1783.1775-.3614.34563-.5493.50438-.0495.04197-.1133.06309-.178.0589-.0647-.0042-.1253-.03339-.1689-.0814zm7.32751 9.54684c.0451.0485.0801.1054.103.1674.023.0621.0334.1281.0306.1942s-.0186.131-.0467.1909c-.028.06-.0676.1137-.1166.1582s-.1063.0789-.1686.1011-.1285.0317-.1945.0282c-.0661-.0036-.1308-.0202-.1904-.0489-.0596-.0288-.1129-.0691-.1568-.1186l-1.38-1.5156c-1.0234.4527-2.13093.6842-3.25001.6794-2.18 0-4.16062-.8288-5.72875-2.39627-1.17687-1.17687-1.708746-2.35062-1.728121-2.4-.028429-.06394-.043119-.13314-.043119-.20312s.01469-.13918.043119-.20313c.019375-.0475.551251-1.22375 1.728121-2.40062.47018-.47235.99467-.88733 1.5625-1.23625l-1.20375-1.324379c-.04508-.048429-.0801-.105324-.10303-.167388-.02294-.062064-.03332-.128063-.03056-.194171.00276-.066107.01862-.13101.04665-.190944.02803-.059935.06767-.113711.11664-.15821.04896-.0444996.10628-.0788379.16861-.1010248.06233-.02218694.12845-.03178117.19452-.02822675.06607.00355443.13078.02018695.19037.04893335.0596.0287465.11289.0690352.1568.1185312zm-4.09313-3.01559-3.29313-3.625c-.33933.46493-.50783 1.03272-.47706 1.60749.03078.57478.25894 1.12132.64598 1.54737.38704.42604.90924.70548 1.47843.79113.56919.08566 1.1505-.02772 1.64578-.32099z"/>
									</svg>
								} @else {
									<svg height="10" viewBox="0 0 16 10" width="16">
										<path
											d="m15.4569 4.7975c-.0219-.04937-.5513-1.22375-1.7282-2.40063-1.5681-1.56812-3.5487-2.39687-5.72871-2.39687-2.18 0-4.16062.82875-5.72875 2.39687-1.17687 1.17688-1.708746 2.35313-1.728121 2.40063-.028429.06394-.043119.13314-.043119.20312s.01469.13918.043119.20313c.021875.04937.551251 1.22313 1.728121 2.4 1.56813 1.5675 3.54875 2.39625 5.72875 2.39625 2.18001 0 4.16061-.82875 5.72871-2.39625 1.1769-1.17687 1.7063-2.35063 1.7282-2.4.0284-.06395.0431-.13315.0431-.20313s-.0147-.13918-.0431-.20312zm-7.45691 2.7025c-.49445 0-.9778-.14662-1.38892-.42133-.41112-.2747-.73156-.66515-.92077-1.12196-.18922-.45682-.23873-.95948-.14227-1.44444.09646-.48495.33457-.93041.6842-1.28004s.79509-.58773 1.28004-.68419c.48495-.09647.98762-.04696 1.44443.14226.45682.18922.84726.50965 1.122.92077.2747.41113.4213.89448.4213 1.38893 0 .66304-.2634 1.29893-.73224 1.76777s-1.10472.73223-1.76777.73223z"/>
									</svg>
								}
							</div>
						</div>
					</div>
					<button type="submit" [disabled]="!loginForm.valid"
									class="bg-black text-white text-preset-4 py-4 rounded-lg hover:bg-gray-500 hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300">
						Login
					</button>
				</form>

				<div class="text-preset-4 text-gray-500 font-light mt-4 justify-self-center">
					Need to create an account <a [routerLink]="['../signup']" class="text-gray-900 text-preset-4 underline hover:text-gray-500 hover:cursor-pointer">Sign Up</a>
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
export class Login implements OnDestroy {
	private fb = inject(FormBuilder);

	loginForm = this.fb.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, SignUpValidators.password]]
	});

	passwordInputType = signal<'text' | 'password'>('password');

	togglePwdInputType() {
		this.passwordInputType.update(prev => prev === 'text' ? 'password' : 'text');
	}

	onSubmit() {
		console.log('submitted');
	}

	ngOnDestroy() {
		this.loginForm.reset();
	}
}
