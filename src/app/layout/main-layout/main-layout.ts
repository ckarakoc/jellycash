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
		<div class="finance-app flex flex-col min-h-screen lg:flex-row-reverse">
			<div class="app-body flex flex-col flex-1 lg:flex-row-reverse bg-beige-100">
				<main class="content-wrapper flex-1 overflow-y-auto overflow-x-hidden">
					<router-outlet></router-outlet>
				</main>
				<app-navigation class="sticky bottom-0 left-0 right-0 shrink-0 lg:flex min-w-80"></app-navigation>
			</div>
		</div>
	`,
	styles: ``
})
export class MainLayout {

}
