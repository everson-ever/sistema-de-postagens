import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
	selector: 'app-cadastro',
	templateUrl: './cadastro.component.html',
	styleUrls: [ './cadastro.component.css' ]
})
export class CadastroComponent implements OnInit {
	public usuario: Usuario;
	public status: boolean;

	constructor(private usuarioService: UsuarioService, private router: Router) {
		this.usuario = new Usuario();
		this.status = false;
	}

	ngOnInit() {}

	public cadastrar(fm: NgForm) {
		this.usuarioService.cadastrar(this.usuario).subscribe((data) => {
			this.status = data['status'];

			this.router.navigate([ '' ]);
		});

		fm.reset();
	}
}
