import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PostagemService } from '../services/postagem.service';
import { Postagem } from '../models/Postagem';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { Comentario } from '../models/Comentario';

@Component({
	selector: 'app-visializar-postagem',
	templateUrl: './visializar-postagem.component.html',
	styleUrls: [ './visializar-postagem.component.css' ]
})
export class VisializarPostagemComponent implements OnInit {
	public postagem: Postagem;
	public comentarios: Comentario[];
	public id: number;
	@ViewChild('boxMensagens', { static: false })
	boxMensagens: ElementRef;

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
		this.postagemService.getMessages(this.id).subscribe(
			(data) => {
				this.comentarios = data;
			},
			(error) => {
				console.log(error);
			},
			() => {
				this.boxMensagemScroll();
			}
		);
	}

	public comentar(comentario: string, idPost: number) {
		this.postagemService.comentar(comentario, idPost).subscribe((data) => {
			this.getComentarios();
			//this.boxMensagemScroll();
		});
	}

	public boxMensagemScroll() {
		this.boxMensagens.nativeElement.scrollTop = this.boxMensagens.nativeElement.scrollHeight;
	}

	ngOnInit() {
		this.chatService.messages.subscribe((comentario) => {
			if (this.postagem.idPostagem == comentario.idPost) {
				this.boxMensagemScroll();
				this.comentarios.push(comentario);
			}
		});
	}
}
