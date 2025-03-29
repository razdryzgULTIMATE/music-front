import {Component, inject, OnInit} from '@angular/core';
import {IArtistExtended} from '../../interfaces/IArtistExtended';
import {ArtistService} from '../../services/artist/artist.service';
import {ActivatedRoute, RouterLink} from '@angular/router';

@Component({
  selector: 'app-artist',
  imports: [RouterLink],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.css'
})
export class ArtistComponent implements OnInit{
  artist: IArtistExtended = {
    albums: [],
    id: 0,
    name: ""
  }
  constructor(private artistService: ArtistService,
              private route: ActivatedRoute,) {
  }
  ngOnInit(): void {
    const id = this.route.snapshot.params['artistId']
    console.log(id)
    this.artistService.getArtistById(id).subscribe(data => {
      this.artist.id = id
      this.artist.albums = data.albums;
      this.artist.name = data.name
    })
  }

}
