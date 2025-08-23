import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

/**
 * Logged in guard that checks if the user is logged in. If it is, redirects to the home page.
 * @param route
 * @param state
 */
export const loggedInGuard: CanActivateFn = (route, state) => {
	// todo: inject auth service and check if user is logged in
	const router = inject(Router);
	return router.parseUrl('/overview');
};
