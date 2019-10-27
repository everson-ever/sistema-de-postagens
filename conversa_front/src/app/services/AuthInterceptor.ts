import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthTokenService } from './auth-token.service';

@Injectable({
	providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
	constructor(private authTokenService: AuthTokenService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = this.authTokenService.getToken();

		if (token) {
			const cloned = req.clone({
				headers: req.headers.set('Authorization', 'JWT '.concat(token))
			});

			return next.handle(cloned);
		} else {
			return next.handle(req);
		}
	}
}
