import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TokenDecodedService } from './token-decoded.service';
import { ApiService } from './api.service';
import { GenerateKeyAuthService } from './generate-key-auth.service';

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	constructor(
		private http: HttpClient,
		private router: Router,
		private tokenDecodedService: TokenDecodedService,
		private apiService: ApiService
	) {}

	public login(usuario): Observable<any> {
		return this.http.post(`${this.apiService.getBaseUrl()}/session`, usuario);
	}

	public logoff() {
		localStorage.removeItem('Session');
		localStorage.removeItem('jwt');
		// localStorage.removeItem('nome');
		// localStorage.removeItem('admin');

		this.router.navigate([ '' ]);
	}
}
