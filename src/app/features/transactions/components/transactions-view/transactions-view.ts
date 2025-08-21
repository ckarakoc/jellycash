import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DataService } from '../../../../shared/services/data-service';

@Component({
	selector: 'app-transactions-view',
	imports: [
		JsonPipe
	],
	template: `
		<div class="text-preset-1">
			transactions-view works!
		</div>
		T:{{ deviceService.isTablet() }} M:{{ deviceService.isMobile() }} D:{{ deviceService.isTablet() }}
		<pre class="whitespace-pre-wrap break-words overflow-x-auto">{{ dataService.getTransactions() | json }}</pre>
	`,
	styles: ``
})
export class TransactionsView {
	dataService = inject(DataService);
	deviceService = inject(DeviceDetectorService);
}
