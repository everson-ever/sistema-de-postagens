import { Component, OnInit } from '@angular/core';
import { PostagemService } from '../services/postagem.service';
import { Postagem } from '../models/Postagem';
import { ChatService } from '../services/chat.service';
import { WebsocketService } from '../services/websocket.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
	public postagens: Postagem[];

	constructor(private postagemService: PostagemService, private webSocketService: WebsocketService) {
		this.listeningPost();
	}

	ngOnInit() {
		this.getAll();
	}

	public listeningPost() {
		this.webSocketService.registerPostagemSocket((post) => {
			console.log(post);
			this.postagens.push(post);
		});
	}

	public getAll() {
		this.postagemService.index().subscribe((data) => {
			console.log(data);
			this.postagens = data;
		});
	}
}
