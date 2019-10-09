import { Component, OnInit } from '@angular/core';
import { Postagem } from '../models/Postagem';
import { NgForm } from '@angular/forms';
import { PostagemService } from '../services/postagem.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-nova-postagem',
	templateUrl: './nova-postagem.component.html',
	styleUrls: [ './nova-postagem.component.css' ]
})
export class NovaPostagemComponent implements OnInit {
	public postagem: Postagem;

	constructor(private postagemService: PostagemService, private router: Router) {
		this.postagem = new Postagem();
	}

	ngOnInit() {}

	public cadastrar(fm: NgForm) {
		this.postagemService.cadastrar(this.postagem).subscribe((data) => {
			if (data.status) {
				this.router.navigate([ 'home' ]);
			}
		});
	}
}
