import { Injectable, ɵConsole } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class GenerateKeyAuthService {
	private keyAuth: string;

	constructor() {
		this.keyAuth = '';
		this.generateKeyAuth();
	}

	public getKeyAuth() {
		return this.keyAuth;
	}

	public generateKeyAuth(): void {
		this.keyAuth = 'Session';
	}
}
