import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	private baseUrl: string;

	constructor() {
		this.baseUrl = 'http://192.168.0.2:3000/api';
	}

	getBaseUrl() {
		return this.baseUrl;
	}
}
