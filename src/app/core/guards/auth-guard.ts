import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

/**
 * Auth guard that checks if the user is authenticated. If not, redirects to the login page.
 * @param route
 * @param state
 */
export const authGuard: CanActivateFn = (route, state) => {
	// todo: inject auth service and check if user is authenticated
	const router = inject(Router);
	return router.parseUrl('/auth');
};
