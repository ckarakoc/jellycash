import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { DataService } from '../../../../shared/services/data-service';

@Component({
	selector: 'app-pots-view',
	imports: [
		JsonPipe
	],
	template: `
		<p>
			pots-view works!
		</p>
		<pre class="whitespace-pre-wrap break-words overflow-x-auto">
			{{ dataService.getPots() | json }}
		</pre>
	`,
	styles: ``
})
export class PotsView {
	dataService = inject(DataService);
}
