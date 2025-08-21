import { Component, inject, input } from '@angular/core';
import { ReplacePipe } from '../../../shared/pipes/replace-pipe';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { IconService } from '../../../shared/services/icon-service';

@Component({
  selector: 'nav-item',
	imports: [
		ReplacePipe,
		RouterLinkActive,
		TitleCasePipe,
		RouterLink
	],
  template: `
		<div class="flex flex-col items-center py-3 px-6 fill-gray-300 hover:text-white hover:fill-white hover:cursor-pointer sm:py-4 sm:px-4 lg:w-full lg:flex-row lg:gap-5 lg:border-l-4 lg:border-l-gray-900"
				 [routerLink]="link()"
				 routerLinkActive="activate"
		>
			<!-- Icon -->
			<span [innerHTML]="iconService.getSanitizedIcon(link())"></span>
			<!-- Text -->
			<a class="hidden sm:block text-nowrap"
				 [routerLink]="link()"
				 [class.sm:hidden]="navbarCollapsed()"
			>
				{{ link() | titlecase | replace:'-':' ' }}
			</a>
		</div>
  `,
  styles: `
		.activate {
			background-color: white;
			border-top-left-radius: 1rem;
			border-top-right-radius: 1rem;
			fill: var(--color-jelly-green);
			border-bottom-color: var(--color-jelly-green);
			border-bottom-width: 8px;
			border-bottom-style: solid;
		}

		/* Large screens (lg: 1024px and up) */
		@media (min-width: 1024px) {
			.activate {
				border-top-left-radius: 0;
				border-top-right-radius: 1rem;
				border-bottom-right-radius: 1rem;
				color: var(--color-gray-900);
				border-left-color: var(--color-jelly-green);
				border-left-width: 4px;
				border-left-style: solid;
				border-bottom-width: 0;
			}

			.activate:hover {
				color: black;
			}
		}
  `
})
export class NavItem {
	link = input.required<string>();
	navbarCollapsed = input.required<boolean>();

	iconService = inject(IconService);
}
