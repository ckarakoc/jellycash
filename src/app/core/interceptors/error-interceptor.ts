import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { HotToastService } from '@ngxpert/hot-toast';
import { inject } from '@angular/core';
import { finalize, tap } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
	const toast = inject(HotToastService);
	return next(req).pipe(
		//todo: toast.observe(...) doesn't work... why? Also giving the id inside toast.error(..., { id: 'register' } ) doesn't work. Inspector Gagdet it...
		tap({
			next: () => {
				toast.loading('Loading...', { id: 'global-error-toast' });
			},
			error: (err: HttpErrorResponse) => {
				console.log(`Intercepted Error:`);
				console.log(err);
				toast.close('global-error-toast');
				toast.error(`Status Code ${ err.status } : ${ err.error?.error }`);
			},
			complete: () => {
				toast.close('global-error-toast');
			}
		}),
		//catchError((err) => throwError(() => err)), // todo: no need?
		finalize(() => {
			toast.close('global-error-toast');
		})
	);
};
