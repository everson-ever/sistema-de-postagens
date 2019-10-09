import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';

@Component({
	selector: 'app-cadastro',
	templateUrl: './cadastro.component.html',
	styleUrls: [ './cadastro.component.css' ]
})
export class CadastroComponent implements OnInit {
	public usuario: Usuario;
	public status: boolean;

	constructor(private usuarioService: UsuarioService) {
		this.usuario = new Usuario();
		this.status = false;
	}

	ngOnInit() {}

	public cadastrar(fm: NgForm) {
		this.usuarioService.cadastrar(this.usuario).subscribe((data) => {
			this.status = data['status'];
		});

		fm.reset();
	}
}
