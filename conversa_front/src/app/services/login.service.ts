import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { AuthTokenService } from './auth-token.service';

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	public usuarioLogado: boolean;

	constructor(
		private http: HttpClient,
		private router: Router,
		private apiService: ApiService,
		private authTokenService: AuthTokenService
	) {}

	public login(usuario) {
		try {
			let session = this.http.post(`${this.apiService.getBaseUrl()}/session`, usuario);

			session.subscribe((usuarioLogado) => {
				if (usuarioLogado['status']) {
					this.authTokenService.setToken(usuarioLogado['token']);
					this.authTokenService.setAuth(this.authTokenService.getToken().substr(1, 20));
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
		this.authTokenService.removerTokenAuth();
		// localStorage.removeItem('nome');
		// localStorage.removeItem('admin');

		this.router.navigate([ '' ]);
	}

	public logado() {
		if (this.authTokenService.getAuth()) {
			return true;
		} else {
			return false;
		}
	}
}
