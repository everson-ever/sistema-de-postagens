import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { GenerateKeyAuthService } from '../services/generate-key-auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	public emailUsuario: string;
	public senhaUsuario: string;
	public status: boolean;

	constructor(
		private loginService: LoginService,
		private router: Router,
		private generateKeyAuthService: GenerateKeyAuthService
	) {
		this.status = true;
	}

	ngOnInit() {}

	public login(fm: NgForm): void {
		const usuario = { email: this.emailUsuario, senha: this.senhaUsuario };
		this.loginService.login(usuario).subscribe((data) => {
			if (data.status) {
				try {
					localStorage.setItem('jwt', data.token);
					localStorage.setItem(this.generateKeyAuthService.getKeyAuth(), data.token.substr(1, 20));
					this.router.navigate([ '/home' ]);
				} catch (e) {
					return;
				}
			} else {
				this.status = false;
			}
		});

		fm.reset();
	}
}
