import { inject, Injectable } from '@angular/core';
import { MockApiService } from '../../../core/services/mock-api-service';

@Injectable({
	providedIn: 'root'
})
export class RecurringBillsService {
	private mockApi = inject(MockApiService);
}
