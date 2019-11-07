import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostagemService } from '../services/postagem.service';

@Component({
	selector: 'app-editar',
	templateUrl: './editar.component.html',
	styleUrls: [ './editar.component.css' ]
})
export class EditarComponent implements OnInit {
	public id: number;

	constructor(private route: ActivatedRoute, private postagemService: PostagemService) {
		this.route.params.subscribe((data) => (this.id = data.id));

		this.getPostagem();
	}

	getPostagem() {
		this.postagemService.get(this.id).subscribe((data) => {
			console.log(data);
		});
	}

	ngOnInit() {}
}
