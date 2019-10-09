import { Injectable, ɵConsole } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class GenerateKeyAuthService {
	private keyAuth: string;
	private valueAuth;

	constructor() {
		this.keyAuth = '';
		this.generateKeyAuth();
	}

	public getKeyAuth() {
		return this.keyAuth;
	}

	public generateKeyAuth(): string {
		this.keyAuth = 'Session';
		return;
	}
}
