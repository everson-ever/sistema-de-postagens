import { Component, OnInit } from '@angular/core';
import { Postagem } from '../models/Postagem';
import { PostagemService } from '../services/postagem.service';

@Component({
	selector: 'app-postagens-edicao',
	templateUrl: './postagens-edicao.component.html',
	styleUrls: [ './postagens-edicao.component.css' ]
})
export class PostagensEdicaoComponent implements OnInit {
	public postagens: Postagem;

	constructor(private postagemService: PostagemService) {
		this.getAll();
	}

	ngOnInit() {}

	public getAll() {
		this.postagemService.minhasPostagens(0).subscribe((data) => {
			this.postagens = data;
		});
	}
}
