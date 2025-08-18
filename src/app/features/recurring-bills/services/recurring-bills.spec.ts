import { TestBed } from '@angular/core/testing';

import { RecurringBillsService } from './recurring-bills';

describe('RecurringBillsService', () => {
	let service: RecurringBillsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(RecurringBillsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
