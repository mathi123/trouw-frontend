import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ContextService } from './context.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private contextService: ContextService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.contextService.getCurrentUser() !== null) { return true; }

    // Store the attempted URL for redirecting
    this.contextService.setRedirectUrl(url);

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}
