import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { GenerateKeyAuthService } from './services/generate-key-auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
	constructor(private router: Router, private generateKeyAuthService: GenerateKeyAuthService) {}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		try {
			if (sessionStorage.getItem('Session') == sessionStorage.getItem('jwt').substr(1, 20)) {
				return true;
			} else {
				this.router.navigate([ '' ]);
				return false;
			}
		} catch (e) {
			return;
		}
	}
}
