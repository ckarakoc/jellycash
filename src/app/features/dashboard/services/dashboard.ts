import { inject, Injectable } from '@angular/core';
import { BudgetsService } from '../../budgets/services/budgets-service';
import { PotsService } from '../../pots/services/pots-service';
import { RecurringBillsService } from '../../recurring-bills/services/recurring-bills';
import { TransactionsService } from '../../transactions/services/transactions-service';

@Injectable({
	providedIn: 'root'
})
export class Dashboard {
	// todo: core?
	private budgetsService = inject(BudgetsService);
	private transactionsService = inject(TransactionsService);
	private recurringBillsService = inject(RecurringBillsService);
	private potsService = inject(PotsService);

	getDashboardSummary() {
		return;
	}

}
