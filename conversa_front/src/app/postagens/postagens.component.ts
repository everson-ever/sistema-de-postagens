import { Component, OnInit, Input } from '@angular/core';
import { Postagem } from '../models/Postagem';
import { PostagemService } from '../services/postagem.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-postagens',
	templateUrl: './postagens.component.html',
	styleUrls: [ './postagens.component.css' ]
})
export class PostagensComponent implements OnInit {
	@Input() postagens;
	@Input() idDeletar;

	constructor(private postagemService: PostagemService, private router: Router) {}

	public destroy(id: number) {
		this.postagemService.destroy(id).subscribe((data) => {
			if (data === 200) {
				this.router.navigate([ '/minhas-postagens' ]);
			}
		});
	}

	ngOnInit() {}
}
