import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const router = inject(Router);

	const authReq = req.clone({ withCredentials: true });

	return next(authReq).pipe(
		catchError((err: HttpErrorResponse) => {
			if (err.status === 401) { // unauthorized
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
