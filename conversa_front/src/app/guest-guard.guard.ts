import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { GenerateKeyAuthService } from './services/generate-key-auth.service';

@Injectable({
	providedIn: 'root'
})
export class GuestGuardGuard implements CanActivate {
	constructor(private router: Router, private generateKeyAuthService: GenerateKeyAuthService) {}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		try {
			if (sessionStorage.getItem('Session')) {
				this.router.navigate([ '/home' ]);
				return false;
			} else {
				return true;
			}
		} catch (e) {
			return;
		}
	}
}
