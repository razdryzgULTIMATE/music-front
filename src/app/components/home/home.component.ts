import {Component, inject, OnInit} from '@angular/core';
import {IArtist} from '../../interfaces/IArtist';
import {ArtistService} from '../../services/artist/artist.service';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  artists: IArtist[] = [];
  private artistService = inject(ArtistService);
  ngOnInit() {
    this.artistService.getArtists().subscribe(arts => arts.forEach(art => this.artists.push(art)))
  }

}
