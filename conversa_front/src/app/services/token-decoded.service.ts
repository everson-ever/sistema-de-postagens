import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
	providedIn: 'root'
})
export class TokenDecodedService {
	constructor() {}

	public getToken(): string {
		return localStorage.getItem('jwt');
	}

	public decodePayloadJWT(): any {
		try {
			return jwt_decode(this.getToken());
		} catch (Error) {
			return null;
		}
	}
}
