import { Component, OnInit } from '@angular/core';
import { PostagemService } from '../services/postagem.service';
import { Postagem } from '../models/Postagem';
import { ChatService } from '../services/chat.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
	public postagens: Array<Postagem>;

	constructor(private postagemService: PostagemService, private chatService: ChatService) {}

	ngOnInit() {
		this.getAll();
		this.chatService.event = 'postagem';
		this.chatService.messages.subscribe((msg) => {
			// if (this.postagem.idPostagem == msg.idPost) {
			//console.log(msg);
			//this.postagens.push(msg['post']);
			//console.log('Teste ==>', this.postagens);
			this.getAll();
			// }
		});
	}

	public getAll() {
		this.postagemService.index().subscribe((data) => {
			this.postagens = data;
		});
	}
}
