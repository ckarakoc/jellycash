import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { Logout } from './components/logout/logout';

export default [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: Login
	},
	{
		path: 'signup',
		component: Signup
	},
	{
		path: 'logout',
		component: Logout
	}
] satisfies Routes;
