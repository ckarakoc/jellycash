import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { TransactionsService } from '../../services/transactions';
import { DeviceDetectorService } from 'ngx-device-detector';

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
		<pre class="whitespace-pre-wrap break-words overflow-x-auto">{{ getTransactionsTest() | json }}</pre>
	`,
	styles: ``
})
export class TransactionsView {

	private ts = inject(TransactionsService);
	deviceService = inject(DeviceDetectorService);

	getTransactionsTest() {
		return this.ts.getTransactions(0, 25);
	}

}
