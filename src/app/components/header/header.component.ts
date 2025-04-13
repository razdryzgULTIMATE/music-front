import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private authService = inject(AuthService)
  get isLoggedIn(): boolean {
    return this.authService.isAuth;
  }
  get isAdmin(){
    return this.authService.role ==="ADMIN";
  }
  get username(){
    return localStorage.getItem("username")!
  }
  logout(){
    console.log("logged out")
    this.authService.logout();
  }
}
