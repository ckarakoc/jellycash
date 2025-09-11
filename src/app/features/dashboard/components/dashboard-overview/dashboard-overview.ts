import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-dashboard-overview',
	imports: [
		RouterLink
	],
	template: `
		<p>
			dashboard-overview works!

			<button class="bg-yellow-200 cursor-pointer" routerLink="/auth/logout">[TEMP] Sign Out </button>
		</p>
	`,
	styles: ``
})
export class DashboardOverview {

}
