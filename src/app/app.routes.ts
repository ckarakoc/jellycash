import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
	{
		path: '', component: MainLayout, children: [
			{
				path: '',
				redirectTo: 'dashboard',
				pathMatch: 'full'
			},
			{
				path: 'dashboard',
				loadChildren: () => import('./features/dashboard/dashboard.routes')
			},
			{
				path: 'budgets',
				loadChildren: () => import('./features/budgets/budgets.routes')
			},
			{
				path: 'transactions',
				loadChildren: () => import('./features/transactions/transactions.routes')
			},
			{
				path: 'recurring-bills',
				loadChildren: () => import('./features/recurring-bills/recurring-bills.routes')
			},
			{
				path: 'pots',
				loadChildren: () => import('./features/pots/pots.routes')
			}
		]
	}
];
