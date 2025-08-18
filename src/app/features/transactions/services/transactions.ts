import { inject, Injectable } from '@angular/core';
import { MockApiService } from '../../../core/services/mock-api-service';
import { TransactionParams } from '../models/transaction-params';

@Injectable({
	providedIn: 'root'
})
export class TransactionsService {

	private mockApi = inject(MockApiService);

	getTransactions(page: number = 0, pageSize: number = 25) {
		const params: TransactionParams = { sortBy: 'date', sortOrder: 'desc', filter: 'all' };
		return this.mockApi.get('transactions', page, pageSize);
	}

}
