import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUser, User } from '../models/user';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, catchError, filter, firstValueFrom, map, Observable, of, switchMap, take, tap } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	http = inject(HttpClient);
	private readonly baseUrl = environment.backendUrl;

	private _currentUser = signal<User | null>(null);
	private _initialized = signal<boolean>(false);

	public readonly currentUser = this._currentUser.asReadonly();
	public readonly isAuthenticated = computed(() => this._currentUser() !== null);
	public readonly initialized = this._initialized.asReadonly();

	// Observable that completes when auth state is initialized
	public readonly initialized$ = new BehaviorSubject<boolean>(false);

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

	async waitForInitialization(): Promise<void> {
		if (this._initialized()) {
			return Promise.resolve();
		}
		return firstValueFrom(this.initialized$.pipe(filter(value => value), take(1))).then();
	}

	private initializeAuthState() {
		console.log('Initializing Auth state...');
		this.me()
			.pipe(
				catchError(err => {
					console.error('error', err);
					return of(null);
				})
			)
			.subscribe(user => {
				this._currentUser.set(user);
				this._initialized.set(true);
				this.initialized$.next(true);
				this.initialized$.complete();
				console.log('Auth state initialized.');
			});
	}
}
