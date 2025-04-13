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
import {AdminAlbumComponent} from './components/admin/admin-album/admin-album.component';
import {AdminGenreComponent} from './components/admin/admin-genre/admin-genre.component';
import {AdminTrackComponent} from './components/admin/admin-track/admin-track.component';
import {AdminTagComponent} from './components/admin/admin-tag/admin-tag.component';
import {AdminReviewComponent} from './components/admin/admin-review/admin-review.component';
import {AdminArtistComponent} from './components/admin/admin-artist/admin-artist.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'user/:username', component: UserComponent, canActivate: [canActivateAuth]},
  {path: 'admin',
    component: AdminComponent,
    canActivate: [canActivateAuth, canActivateAdmin],
    children: [
      {path: 'albums', component: AdminAlbumComponent},
      {path: 'genres', component: AdminGenreComponent},
      {path: 'tracks', component: AdminTrackComponent},
      {path: 'tags', component: AdminTagComponent},
      {path: 'reviews', component: AdminReviewComponent},
      {path: 'artists', component: AdminArtistComponent}
    ]
  },
  {path: 'artist/:artistName/:artistId', component: ArtistComponent},
  {path: 'album/:albumId', component: AlbumComponent},

];
