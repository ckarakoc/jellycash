import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { map } from 'rxjs';

/**
 * Guard that ensures that only non-authenticated users can access the route. If the user is already authenticated, redirects to the page the user came from or the home page.
 * This guard does not apply to the logout route.
 * @param route
 * @param state
 */
export const guestGuard: CanActivateFn = (route, state) => {
	const authService = inject(AuthService);
	const router = inject(Router);

	if (state.url.startsWith('/auth/logout')) {
		return true;
	}

	return authService.refresh()
		.pipe(
			map(successfulAuthentication => {
				if (successfulAuthentication) {
					const returnUrl = route.queryParams['returnUrl'] || '/';
					router.navigate([returnUrl]);
					return false;
				} else {
					return true;
				}
			})
		);
};
