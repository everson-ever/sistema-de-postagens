import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AuthTokenService } from '../services/auth-token.service';
import { promisify } from 'util';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	public emailUsuario: string;
	public senhaUsuario: string;
	public status: boolean;

	constructor(private loginService: LoginService, private authTokenService: AuthTokenService) {
		this.status = false;
	}

	ngOnInit() {}

	public async login(fm: NgForm) {
		const usuario = { email: this.emailUsuario, senha: this.senhaUsuario };
		let usuarioLogado = await promisify(() => {
			this.loginService.login(usuario);
		})();

		console.log(usuarioLogado);

		if (!usuarioLogado) {
			this.status = true;
		}
	}
}
