import { Component, OnInit } from '@angular/core';
import { PostagemService } from '../services/postagem.service';
import { Postagem } from '../models/Postagem';

@Component({
	selector: 'app-minhas-postagens',
	templateUrl: './minhas-postagens.component.html',
	styleUrls: [ './minhas-postagens.component.css' ]
})
export class MinhasPostagensComponent implements OnInit {
	public postagens: Postagem;

	constructor(private postagemService: PostagemService) {
		this.getAll();
	}

	ngOnInit() {}

	public getAll() {
		this.postagemService.minhasPostagens(1).subscribe((data) => {
			this.postagens = data;
		});
	}
}
