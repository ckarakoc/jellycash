import { Routes } from '@angular/router';
import { TransactionsView } from './components/transactions-view/transactions-view';

export default [
	{
		path: '',
		component: TransactionsView
	}
] satisfies Routes;
