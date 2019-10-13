import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ChatService {
	// messages: Subject<any>;
	// event;
	// // Our constructor calls our wsService connect method
	// constructor(private wsService: WebsocketService) {
	// 	this.web();
	// }
	// web() {
	// 	this.messages = <Subject<any>>this.wsService.connect().pipe(
	// 		map((response: any): any => {
	// 			return response;
	// 		})
	// 	);
	// }
	// sendMsg(msg) {
	// 	this.messages.next(msg);
	// }
}
