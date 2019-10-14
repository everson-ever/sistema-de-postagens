import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthTokenService } from '../services/auth-token.service';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: [ './menu.component.css' ]
})
export class MenuComponent implements OnInit {
	public nomeUsuario: string;
	public logado;

	constructor(
		private loginService: LoginService,
		private router: Router,
		private authTokenService: AuthTokenService
	) {
		this.dataUser();
	}

	ngOnInit() {
		this.authTokenService.decodePayloadJWT();
	}

	public mostraMenu(): boolean {
		return this.loginService.logado();
	}

	public dataUser() {
		if (this.loginService.logado()) {
			this.nomeUsuario = this.authTokenService.getUserLogged();
		}
	}

	public logoff() {
		this.loginService.logoff();
	}
}
