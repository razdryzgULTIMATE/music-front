import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {UserComponent} from './components/user/user.component';
import {AdminComponent} from './components/admin/admin.component';
import {canActivateAuth} from './services/auth/guards/acess.guard';
import {ArtistComponent} from './components/artist/artist.component';
import {AlbumComponent} from './components/album/album.component';
import {canActivateAdmin} from './services/auth/guards/admin.guard';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'user/:username', component: UserComponent, canActivate: [canActivateAuth]},
  {path: 'admin', component: AdminComponent, canActivate: [canActivateAuth, canActivateAdmin]},
  {path: 'artist/:artistName/:artistId', component: ArtistComponent},
  {path: 'album/:albumId', component: AlbumComponent},

];
