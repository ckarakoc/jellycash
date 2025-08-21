import { Component, inject } from '@angular/core';
import { DataService } from '../../../../shared/services/data-service';
import { JsonPipe } from '@angular/common';

@Component({
	selector: 'app-recurring-bills-view',
	imports: [
		JsonPipe
	],
	template: `
		<p>
			recurring-bills-view works!
		</p>
		<pre>
			{{ transactionService.getRecurringTransactions() | json }}
		</pre>
	`,
	styles: ``
})
export class RecurringBillsView {
	transactionService = inject(DataService);

}
