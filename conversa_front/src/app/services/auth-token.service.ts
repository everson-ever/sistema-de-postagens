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
		return sessionStorage.getItem('jwt');
	}

	public setToken(token: string) {
		sessionStorage.setItem('jwt', token);
	}

	public setAuth(value: string) {
		sessionStorage.setItem(this.generateKeyAuthService.getKeyAuth(), value);
	}

	public getAuth() {
		return sessionStorage.getItem(this.generateKeyAuthService.getKeyAuth());
	}

	public removerTokenAuth() {
		sessionStorage.removeItem('token');
		sessionStorage.removeItem(this.generateKeyAuthService.getKeyAuth());
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
		try {
			return (this.userLogged = this.decodePayloadJWT().nome);
		} catch (err) {
			return;
		}
	}
}
