import { Component, inject, input, model, Signal } from '@angular/core';
import { IconService } from '../../../shared/services/icon-service';

@Component({
  selector: 'nav-minimize-button',
  imports: [],
  template: `
		<button class="flex gap-3 items-center p-4 fill-gray-300 hover:fill-white hover:text-white hover:cursor-pointer group transition-all duration-300"
						(click)="toggleCollapse()">
					<span class="transition-all duration-500" height="24" viewBox="0 0 20 20" width="24"
								[class.rotate-180]="navbarCollapsed()"
								[innerHTML]="iconService.getSanitizedIcon('minimize-menu')"></span>
			<span [class.hidden]="navbarCollapsed()">Minimize Menu</span>
		</button>
  `,
  styles: ``
})
export class MinimizeButton {
	navbarCollapsed = model.required<boolean>();

	iconService = inject(IconService);

	toggleCollapse() {
		this.navbarCollapsed.set(!this.navbarCollapsed());
	}
}
