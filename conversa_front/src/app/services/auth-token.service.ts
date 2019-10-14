import { Injectable } from '@angular/core';
import { GenerateKeyAuthService } from './generate-key-auth.service';
import * as jwt_decode from 'jwt-decode';

@Injectable({
	providedIn: 'root'
})
export class AuthTokenService {
	public userLogged: string;
	public ehAdmin: number;

	constructor(private generateKeyAuthService: GenerateKeyAuthService) {}

	public getToken() {
		return localStorage.getItem('jwt');
	}

	public setToken(token: string) {
		localStorage.setItem('jwt', token);
	}

	public setAuth(value: string) {
		localStorage.setItem(this.generateKeyAuthService.getKeyAuth(), value);
	}

	public getAuth() {
		return localStorage.getItem(this.generateKeyAuthService.getKeyAuth());
	}

	public removerTokenAuth() {
		localStorage.removeItem('token');
		localStorage.removeItem(this.generateKeyAuthService.getKeyAuth());
	}

	public decodePayloadJWT(): any {
		try {
			let data = jwt_decode(this.getToken());
			return data;
		} catch (Error) {
			return null;
		}
	}

	// public setUserLogged() {
	// 	this.userLogged = this.decodePayloadJWT().nome;
	// 	console.log('SET', this.userLogged);
	// }

	public getUserLogged() {
		return (this.userLogged = this.decodePayloadJWT().nome);
	}
}
