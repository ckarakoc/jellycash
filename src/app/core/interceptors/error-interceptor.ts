import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { HotToastService } from '@ngxpert/hot-toast';
import { inject } from '@angular/core';
import { finalize, tap } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
	let toast = inject(HotToastService);
	return next(req).pipe(
		//todo: toast.observe(...) doesn't work... why? Also giving the id inside toast.error(..., { id: 'register' } ) doesn't work. Inspector Gagdet it...
		tap({
			next: () => {
				toast.loading('Loading...', { id: 'register' });
			},
			error: (err: HttpErrorResponse) => {
				console.log(`Intercepted Error:`);
				console.log(err);
				toast.close('register');
				toast.error(`Status Code ${ err.status }`);
			},
			complete: () => {
				toast.close('register');
			}
		}),
		//catchError((err) => throwError(() => err)), // todo: no need?
		finalize(() => {
			toast.close('register');
		})
	);
};
