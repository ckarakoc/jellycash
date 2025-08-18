import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	// todo: Base HTTP client with common headers
	private readonly baseUrl = environment.apiUrl;

	private http = inject(HttpClient);

	public get<T>(url: string) {
		return this.http.get<T>(url);
	}

	public post<T>(url: string, body: any) {
		return this.http.post<T>(url, body);
	}

	public put<T>(url: string, body: any) {
		return this.http.put<T>(url, body);
	}

	public delete<T>(url: string) {
		return this.http.delete<T>(url);
	}
}
