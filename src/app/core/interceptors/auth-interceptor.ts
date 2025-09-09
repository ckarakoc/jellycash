import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	let authService = inject(AuthService);
	const router = inject(Router);

	const authReq = req.clone({ withCredentials: true });

	return next(authReq).pipe(
		catchError((err: HttpErrorResponse) => {
			if (err.status === 401) { // unauthorized
				authService.clearAuthState();

				const currentUrl = router.url;
				router.navigate(['/auth/login'], {
					queryParams: { returnUrl: currentUrl },
					replaceUrl: true
				});
				console.warn('Session expired, redirecting to login');
			}
			return throwError(() => err);
		})
	);
};
