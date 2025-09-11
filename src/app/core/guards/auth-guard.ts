import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { map } from 'rxjs';

/**
 * Auth guard that checks if the user is authenticated. If not, redirects to the login page.
 * @param route
 * @param state
 */
export const authGuard: CanActivateFn = (route, state) => {
	const authService = inject(AuthService);
	const router = inject(Router);
	return authService.refresh()
		.pipe(
			map(successfulAuthentication => {
				if (successfulAuthentication) {
					return true;
				} else {
					router.navigate(['/auth/login'], {
						queryParams: { returnUrl: router.url },
						replaceUrl: true
					});
					return false;
				}
			})
		);
};
