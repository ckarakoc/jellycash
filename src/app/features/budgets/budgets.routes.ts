import { Routes } from '@angular/router';
import { BudgetsView } from './components/budgets-view/budgets-view';

export default [
	{
		path: '',
		component: BudgetsView
	}
] satisfies Routes;
