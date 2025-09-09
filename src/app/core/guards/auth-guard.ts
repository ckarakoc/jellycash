import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { catchError, map, of } from 'rxjs';

/**
 * Auth guard that checks if the user is authenticated. If not, redirects to the login page.
 * @param route
 * @param state
 */
export const authGuard: CanActivateFn = (route, state) => {
	const authService = inject(AuthService);
	const router = inject(Router);

	if (authService.isAuthenticated()) {
		return true;
	}
	return authService.refresh()
		.pipe(
			map(success => {
				if (success) {
					return true;
				}
				router.navigate(['/auth/login']);
				return false;
			}),
			catchError(() => {
				router.navigate(['/auth/login']);
				return of(false);
			})
		);
};
