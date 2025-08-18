export interface TransactionParams {
	sortBy: 'date'|'name'|'amount';
	sortOrder: 'asc'|'desc';
	filter: string;
}
