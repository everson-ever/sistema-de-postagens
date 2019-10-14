import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { GenerateKeyAuthService } from '../services/generate-key-auth.service';
import { AuthTokenService } from '../services/auth-token.service';

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
		this.status = true;
	}

	ngOnInit() {}

	public login(fm: NgForm): void {
		const usuario = { email: this.emailUsuario, senha: this.senhaUsuario };
		let usuarioLogado = this.loginService.login(usuario);

		if (usuarioLogado) {
			this.status = true;
		} else {
			this.status = false;
		}
	}
}
