import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { ProfileService } from '../services/profile/profile.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private authService: AuthService, 
    private router: Router,
    private profileService: ProfileService
    ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.checkAuth().then(id => {
      console.log('auth guard cheking id: ', id);
      if(id) {
        //get profile
        this.profileService.getProfile().then(profile => {
          console.log('user profile', profile);
        if(profile && profile?.type == 'user'){
          this.router.navigateByUrl('/tabs/home');
            return true;
        } else if (profile && profile?.type == 'admin'){
          this.router.navigateByUrl('/admin');
          return false;
          } else {
            this.authService.logout();
            this.router.navigateByUrl('/login');
            return false;
          }
        }).catch(e => {
          console.log(e);
          this.authService.logout();
          this.router.navigateByUrl('/login');
          return false;
        });
        return true;
    }})
  }
    navigate(url) {
    this.router.navigateByUrl(url, {replaceUrl: true});
    return false;
  }
}
