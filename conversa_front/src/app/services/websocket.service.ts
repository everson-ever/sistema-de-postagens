import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
	providedIn: 'root'
})
export class WebsocketService {
	private listener = 'http://10.208.1.8:3000';

	constructor() {}

	registerPostagemSocket(callback) {
		const socket = io(this.listener);

		socket.on('postagem', callback);
	}

	registerComentarioSocket(callback) {
		const socket = io(this.listener);

		socket.on('comentario', callback);
	}
}
