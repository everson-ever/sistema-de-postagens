import { Component, OnInit } from '@angular/core';
import { PostagemService } from '../services/postagem.service';
import { Postagem } from '../models/Postagem';
import { ActivatedRoute } from '@angular/router';
import { WebsocketService } from '../services/websocket.service';
import { ChatService } from '../services/chat.service';

@Component({
	selector: 'app-visializar-postagem',
	templateUrl: './visializar-postagem.component.html',
	styleUrls: [ './visializar-postagem.component.css' ]
})
export class VisializarPostagemComponent implements OnInit {
	public postagem: Postagem;
	public comentarios: Array<any>;
	public id: number;

	constructor(
		private postagemService: PostagemService,
		private route: ActivatedRoute,
		private chatService: ChatService
	) {
		this.route.params.subscribe((data) => (this.id = data.id));
		this.getPostagem();
		this.getComentarios();
	}

	public getPostagem() {
		this.postagemService.get(this.id).subscribe((data) => {
			this.postagem = data;
		});
	}

	public getComentarios() {
		this.postagemService.getMessages(this.id).subscribe((data) => {
			this.comentarios = data;
		});
	}

	public comentar(comentario: string, idPost: number) {
		this.postagemService.comentar(comentario, idPost).subscribe((data) => {
			this.getComentarios();
		});
	}

	ngOnInit() {
		// this.chatService.event = 'comentario';
		this.chatService.messages.subscribe((comentario) => {
			if (this.postagem.idPostagem == comentario.idPost) {
				this.comentarios.push(comentario);
			}
		});
	}
}
