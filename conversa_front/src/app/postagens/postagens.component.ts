import { Component, OnInit, Input } from '@angular/core';
import { Postagem } from '../models/Postagem';
import { PostagemService } from '../services/postagem.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-postagens',
	templateUrl: './postagens.component.html',
	styleUrls: [ './postagens.component.css' ]
})
export class PostagensComponent implements OnInit {
	@Input() postagens;

	constructor(private postagemService: PostagemService, private router: Router, private route: ActivatedRoute) {}

	public destroy(postagem: Postagem) {
		this.postagemService.destroy(postagem.idPostagem).subscribe((data) => {
			if (data['status']) {
				let indice = this.postagens.indexOf(postagem);
				this.postagens.splice(indice, 1);
			}
		});
	}

	public exibirBotaoDeletar() {
		if (this.router.url === '/minhas-postagens') {
			return true;
		}
		return false;
	}

	ngOnInit() {}
}
