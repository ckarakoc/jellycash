import { Component, inject, signal } from '@angular/core';
import { NavItem } from './nav-item/nav-item';
import { IconService } from '../../shared/services/icon-service';
import { MinimizeButton } from './minimize-button/minimize-button';

@Component({
	selector: 'app-navigation',
	imports: [
		NavItem,
		MinimizeButton
	],
	template: `
		<nav class="flex bg-gray-900 text-gray-300 text-preset-3 p-4 min-w-screen w-full justify-around rounded-t-2xl border-b-cyan-700 border-b-4
		desktop:justify-between desktop:min-h-screen desktop:h-full desktop:w-fit desktop:flex-col desktop:rounded-r-2xl desktop:border-l-cyan-700 desktop:border-l-4"
				 [class.min-w-80]="!navbarCollapsed()"
		>
			<div class="flex flex-col gap-10">
				<!-- LOGO -->
				<div class="p-4 fill-white">
					@if (!navbarCollapsed()) {
						<span [innerHTML]="iconService.getSanitizedIcon('logo-large')"></span>
					} @else {
						<span [innerHTML]="iconService.getSanitizedIcon('logo-small')"></span>
					}
				</div>

				<!-- NAV links -->
				<div class="flex flex-col">
					@for (link of ['overview', 'transactions', 'budgets', 'pots', 'recurring-bills']; track $index) {
						<nav-item [link]="link" [navbarCollapsed]="navbarCollapsed()"/>
					}
				</div>
			</div>

			<!-- Menu Toggle -->
			<nav-minimize-button class="sticky bottom-4" [(navbarCollapsed)]="navbarCollapsed" />
		</nav>
	`,
	styles: ``
})
export class Navigation {
	iconService = inject(IconService);
	navbarCollapsed = signal<boolean>(false);
}
