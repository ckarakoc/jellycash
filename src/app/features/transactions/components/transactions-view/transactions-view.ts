import { Component, inject } from '@angular/core';
import { MockApiService } from '../../../../core/services/mock-api-service';
import { JsonPipe } from '@angular/common';
import { TransactionsService } from '../../services/transactions';

@Component({
	selector: 'app-transactions-view',
	imports: [
		JsonPipe
	],
	template: `
		<p>
			transactions-view works!
		</p>

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
