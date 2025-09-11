import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { HotToastService } from '@ngxpert/hot-toast';
import { inject } from '@angular/core';
import { catchError, finalize, tap, throwError } from 'rxjs';

// TODO: this is a global error interceptor. Need to make it more specific.
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
	const toast = inject(HotToastService);
	return next(req).pipe(
		// TODO: toast.observe(...) doesn't work... why? Also giving the id inside toast.error(..., { id: 'register' } ) doesn't work. Inspector Gagdet it...
		// TODO: create a global toast error handler. Need to look into the library. For now, this is meh...
		tap({
			next: () => {
				toast.loading('Loading...', { id: 'global-error-toast' });
			},
			error: (err: HttpErrorResponse) => {
				console.error('Intercepted error: ', err);
				toast.close('global-error-toast');
				toast.error(`Status Code ${ err.status } : ${ err.error?.error }`);
				throwError(() => err);
			},
			complete: () => {
				toast.close('global-error-toast');
			}
		}),
		catchError((err) => {
			return throwError(() => err);
		}),
		finalize(() => {
			toast.close('global-error-toast');
		})
	);
};
