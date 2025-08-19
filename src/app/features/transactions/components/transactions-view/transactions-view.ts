import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { TransactionsService } from '../../services/transactions';

@Component({
	selector: 'app-transactions-view',
	imports: [
		JsonPipe
	],
	template: `
		<div class="text-preset-1">
			transactions-view works!
		</div>

		<pre>{{ getTransactionsTest() | json }}</pre>
	`,
	styles: ``
})
export class TransactionsView {

	private ts = inject(TransactionsService);


	getTransactionsTest() {
		return this.ts.getTransactions( 0, 25);
	}
}
