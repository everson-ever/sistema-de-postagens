import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Postagem } from '../models/Postagem';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root'
})
export class PostagemService {
	public baseUrl: string;

	constructor(private http: HttpClient, private apiService: ApiService) {}

	public index(): Observable<Postagem> {
		return this.http.get<Postagem>(`${this.apiService.getBaseUrl()}/postagens`);
	}

	public get(id: number): Observable<Postagem> {
		return this.http.get<Postagem>(`${this.apiService.getBaseUrl()}/postagens/${id}`);
	}

	public getMessages(id: number): Observable<any> {
		return this.http.get<any>(`${this.apiService.getBaseUrl()}/comentarios/${id}`);
	}

	public comentar(comentario, idPost): Observable<any> {
		return this.http.post<any>(`${this.apiService.getBaseUrl()}/postagens/comentar`, { comentario, idPost });
	}

	public minhasPostagens(editando: number): Observable<Postagem> {
		return this.http.get<Postagem>(`${this.apiService.getBaseUrl()}/minhas-postagens/?editando=${editando}`);
	}

	public cadastrar(post: Postagem): Observable<any> {
		return this.http.post(`${this.apiService.getBaseUrl()}/postagens`, post);
	}

	public destroy(id: number): Observable<any> {
		return this.http.delete(`${this.apiService.getBaseUrl()}/postagens/${id}`);
	}
}
