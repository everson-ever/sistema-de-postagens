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
	public usuarioLogado: boolean;

	constructor(
		private http: HttpClient,
		private router: Router,
		private tokenDecodedService: TokenDecodedService,
		private apiService: ApiService,
		private generateKeyAuthService: GenerateKeyAuthService
	) {}

	public login(usuario) {
		//return this.http.post(`${this.apiService.getBaseUrl()}/session`, usuario);
		try {
			let session = this.http.post(`${this.apiService.getBaseUrl()}/session`, usuario);

			session.subscribe((usuarioLogado) => {
				if (usuarioLogado['status']) {
					localStorage.setItem('jwt', usuarioLogado['token']);
					localStorage.setItem(
						this.generateKeyAuthService.getKeyAuth(),
						usuarioLogado['token'].substr(1, 20)
					);
					this.router.navigate([ '/home' ]);

					return usuarioLogado['status'];
				}

				return usuarioLogado['status'];
			});
		} catch (error) {
			return false;
		}
	}

	public logoff() {
		localStorage.removeItem(this.generateKeyAuthService.getKeyAuth());
		localStorage.removeItem('jwt');
		// localStorage.removeItem('nome');
		// localStorage.removeItem('admin');

		this.router.navigate([ '' ]);
	}

	public logado() {
		if (localStorage.getItem(this.generateKeyAuthService.getKeyAuth())) {
			return true;
		} else {
			return false;
		}
	}
}
