import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from '../navigation/navigation';

@Component({
	selector: 'app-main-layout',
	imports: [
		RouterOutlet,
		Navigation
	],
	template: `
		<div class="finance-app">
			<div class="app-body flex">
				<app-navigation></app-navigation>
				<main class="content-wrapper">
					<router-outlet></router-outlet>
				</main>
			</div>
		</div>
	`,
	styles: ``
})
export class MainLayout {

}
