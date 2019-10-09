import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root'
})
export class UsuarioService {
	public baseUrl: string;

	constructor(private http: HttpClient, private apiService: ApiService) {}

	public cadastrar(usuario): Observable<Usuario> {
		return this.http.post<Usuario>(`${this.apiService.getBaseUrl()}/cadastro`, usuario);
	}
}
