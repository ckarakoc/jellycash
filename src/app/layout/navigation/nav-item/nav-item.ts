import { Component, inject, input, Signal } from '@angular/core';
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
		<div class="flex gap-5 p-4 items-center-safe fill-gray-300 hover:text-white hover:fill-white hover:cursor-pointer"
				 [routerLink]="link()"
				 routerLinkActive="bg-white! rounded-r-2xl! text-gray-900! fill-cyan-700! hover:text-black!"
		>
			<span [innerHTML]="iconService.getSanitizedIcon(link())"></span>
			<a [routerLink]="link()"
				 [class.hidden]="navbarCollapsed()"
			>
				{{ link() | titlecase | replace:'-':' ' }}
			</a>
		</div>
  `,
  styles: ``
})
export class NavItem {
	link = input.required<string>();
	navbarCollapsed = input.required<boolean>();

	iconService = inject(IconService);
}
