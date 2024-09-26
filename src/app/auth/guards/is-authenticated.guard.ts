
import {CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';


export const IsAuthenticatedGuard: CanActivateFn = (route, state) => {

  // const url = state.url;
  // localStorage.setItem('url', url)

  const authService = inject( AuthService );
  const router = inject( Router );

  if( authService.AuthStatus() === AuthStatus.authenticated ){
    return true;
  }

  if( authService.AuthStatus() === AuthStatus.checking ){
    return false;
  }

  router.navigateByUrl('/auth/login');
  return false;
}
