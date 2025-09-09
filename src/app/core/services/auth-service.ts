import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUser, User } from '../models/user';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	http = inject(HttpClient);
	private readonly baseUrl = environment.backendUrl;

	private _currentUser = signal<User | null>(null);

	public readonly currentUser = this._currentUser.asReadonly();
	public readonly isAuthenticated = computed(() => this._currentUser() !== null);

	constructor() {
		this.initializeAuthState();
	}

	register(dto: RegisterUser): Observable<User> {
		return this.http.post<void>(`${ this.baseUrl }/auth/register`, dto, { withCredentials: true })
			.pipe(
				switchMap(() => this.me()),
				tap(user => this._currentUser.set(user))
			);
	}

	login(dto: Pick<RegisterUser, 'email' | 'password'>): Observable<User> {
		return this.http.post<void>(`${ this.baseUrl }/auth/login`, dto, { withCredentials: true })
			.pipe(
				switchMap(() => this.me()),
				tap(user => this._currentUser.set(user))
			);
	}

	refresh(): Observable<boolean> {
		return this.http.post<boolean>(`${ this.baseUrl }/auth/refresh`, {}, { withCredentials: true })
			.pipe(
				switchMap(() => this.me()),
				tap(user => this._currentUser.set(user)),
				map(() => true),
				catchError(_ => {
					this._currentUser.set(null);
					return of(false);
				})
			);
	}

	logout(): Observable<void> {
		// TODO: logout button
		return this.http.post<void>(`${ this.baseUrl }/auth/logout`, {}, { withCredentials: true })
			.pipe(
				tap(() => this.clearAuthState())
			);
	}

	me(): Observable<User> {
		return this.http.get<User>(`${ this.baseUrl }/auth/me`, { withCredentials: true });
	}

	clearAuthState(): void {
		this._currentUser.set(null);
	}

	private initializeAuthState() {
		this.me()
			.pipe(
				catchError(() => of(null))
			)
			.subscribe(user => {
				this._currentUser.set(user);
			});
	}
}
