import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const authService = inject(AuthService);

	return next(req).pipe(
		catchError((err: HttpErrorResponse) => {
			if (err.status === 401) { // unauthorized
				authService.clearAuthState();
			}
			return throwError(() => err);
		})
	);
};
