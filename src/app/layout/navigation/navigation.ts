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
			<nav class="bg-gray-900 text-gray-300 text-preset-3 rounded-t-2xl lg:rounded-r-2xl lg:rounded-tl-none lg:flex lg:justify-between lg:min-h-screen lg:h-full lg:flex-col">
				<div class="flex flex-col gap-10">
					<!-- LOGO (Only Desktop) -->
					<div class="hidden p-4 mt-6 fill-white lg:block"
							 [class.self-center]="navbarCollapsed()"
							 [class.ml-6]="!navbarCollapsed()"
					>
						<span [innerHTML]="iconService.getSanitizedIcon(!navbarCollapsed() ? 'logo-large' : 'logo-small')"></span>
					</div>
					<!-- NAV links -->
					<div class="flex px-4 pt-2 lg:flex-col lg:px-0">
						@for (link of ['overview', 'transactions', 'budgets', 'pots', 'recurring-bills']; track $index) {
							<nav-item class="flex justify-center items-center grow min-w-0 lg:justify-start lg:mr-5" [link]="link" [navbarCollapsed]="navbarCollapsed()"/>
						}
					</div>
				</div>

				<!-- Menu Toggle (Only Desktop) -->
				<nav-minimize-button class="hidden lg:block lg:sticky lg:bottom-4"
														 [class.self-center]="navbarCollapsed()"
														 [class.ml-6]="!navbarCollapsed()"
														 [(navbarCollapsed)]="navbarCollapsed"/>
			</nav>
    `,
	styles: ``
})
export class Navigation {
	navbarCollapsed = signal<boolean>(false);
	iconService = inject(IconService);
}
