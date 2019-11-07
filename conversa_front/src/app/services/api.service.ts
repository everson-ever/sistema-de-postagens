import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	private baseUrl: string;

	constructor() {
		this.baseUrl = 'http://10.208.1.8:3000/api';
	}

	getBaseUrl() {
		return this.baseUrl;
	}
}
