import {Component, inject, OnInit} from '@angular/core';
import {IArtistExtended} from '../../interfaces/IArtistExtended';
import {ArtistService} from '../../services/artist/artist.service';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AlbumComponent} from '../album/album.component';
import {SlicePipe} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterLinkActive, SlicePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  artists: IArtistExtended[] = [];
  private artistService = inject(ArtistService);
  ngOnInit() {
    this.artistService.getArtists().subscribe(arts => arts.forEach(art => this.artists.push(art)))
    console.log(this.artists)
  }

}
