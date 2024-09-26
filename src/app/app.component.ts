import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth-service.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'authApp';

  private authService = inject( AuthService );
  private router = inject( Router );


  public finishedAuthCheck = computed<boolean>(() =>{
    if( this.authService.AuthStatus() === AuthStatus.checking) {
      return false;
    }

    return true;
  });

  public authStatusChangeEffect = effect(() => {

    switch( this.authService.AuthStatus() ){

      case AuthStatus.checking:
        break;

      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard');
        break;

      case AuthStatus.notAutenticated:
        this.router.navigateByUrl('/auth/login');
        break;
    }
  });
}
