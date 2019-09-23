import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ConfGuard implements CanActivate {
    constructor(private _router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (auth && auth.token) {
            // Redirect to the root page
            this._router.navigate(['/']);
        } else {
            return true;
        }
    }
}
