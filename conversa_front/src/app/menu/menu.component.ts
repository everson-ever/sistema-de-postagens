import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: [ './menu.component.css' ]
})
export class MenuComponent implements OnInit {
	@Input() nomeUsuario;
	public logado;

	constructor(private loginService: LoginService, private route: ActivatedRoute) {}

	ngOnInit() {}

	public mostraMenu() {
		if (localStorage.getItem('Session')) {
			return true;
		} else {
			return false;
		}
	}

	public logoff() {
		this.loginService.logoff();
	}
}
