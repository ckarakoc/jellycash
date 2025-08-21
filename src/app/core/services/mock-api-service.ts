import { Injectable } from '@angular/core';
import { PaginatedResponse } from '../../shared/models/pagination';
import * as financeData from '../../../assets/data/data.json';

export type JsonPrimitive = string | number | boolean | null;
export type JsonObject = { [key: string]: JsonValue };
export type JsonArray = JsonValue[];
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

@Injectable({
	providedIn: 'root'
})
export class MockApiService {
	// todo: to be deleted once the backend is built...

	public get<T>(url: keyof typeof financeData, page: number = 0, pageSize: number = 10): T | PaginatedResponse<T> {
		const data = financeData[url];

		if (Array.isArray(data)) {
			const totalItems = data.length;
			const totalPages = Math.ceil(totalItems / pageSize);
			const startIndex = page * pageSize;
			const endIndex = startIndex + pageSize;

			const paginatedData = data.slice(startIndex, endIndex);

			let response = {
				data: paginatedData,
				pagination: {
					currentPage: page,
					totalPages: totalPages,
					totalItems: totalItems,
					itemsPerPage: pageSize,
					hasNext: page < totalPages - 1,
					hasPrevious: page > 0
				}
			} as PaginatedResponse<T>;
			return response;
		}

		return data as T;
	}

	public post<T>(url: string, body: any) {
	}

	public put<T>(url: string, body: any) {
	}

	public delete<T>(url: string) {
	}

}
