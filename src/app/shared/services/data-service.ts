import { inject, Injectable } from '@angular/core';
import { MockApiService } from '../../core/services/mock-api-service';
import { TransactionParams } from '../../features/transactions/models/transaction-params';

@Injectable({
	providedIn: 'root'
})
export class DataService {

	//todo: currently hardcoded with mockAPI. Once I have the API will remove this class and have proper service
	// these methods are quick-and-dirty. To be deleted once the API is ready.

	private mockApi = inject(MockApiService);

	getTransactions(page: number = 0, pageSize: number = 100) {
		const params: TransactionParams = { sortBy: 'date', sortOrder: 'desc', filter: 'all' };
		return this.mockApi.get('transactions', page, pageSize);
	}

	getRecurringTransactions(page: number = 0, pageSize: number = 100) {
		let result = this.mockApi.get<any[]>('transactions', page, pageSize);
		const dataToIterate = 'data' in result ? result.data : result;
		if (Array.isArray(dataToIterate)) {
			result = dataToIterate.filter(t => t.recurring);
		}
		return result;
	}

	getPots(page: number = 0, pageSize: number = 100) {
		const params: TransactionParams = { sortBy: 'date', sortOrder: 'desc', filter: 'all' };
		return this.mockApi.get('pots', page, pageSize);
	}

	getBudgets(page: number = 0, pageSize: number = 100) {
		const params: TransactionParams = { sortBy: 'date', sortOrder: 'desc', filter: 'all' };
		return this.mockApi.get('budgets', page, pageSize);
	}

}
