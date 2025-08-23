import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
	{
		path: '',
		component: MainLayout,
		canActivate: [authGuard],
		children: [
			{
				path: '',
				redirectTo: 'auth',
				pathMatch: 'full'
			},
			{
				path: 'overview',
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
	},
	{
		path: 'auth',
		component: AuthLayout,
		loadChildren: () => import('./features/auth/auth.routes')
		// canActivate: [loggedInGuard]
	}
];
