import {Component, inject, Input, OnInit} from '@angular/core';
import {IAlbum} from '../../interfaces/IAlbum';
import {AlbumService} from '../../services/album/album.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {routes} from '../../app.routes';
import {IReview, IReviewRequest} from '../../interfaces/IReview';
import {DatePipe} from '@angular/common';
import {StarsPipe} from '../../pipes/rating/stars.pipe';
import {ArtistPipe} from '../../pipes/artists/artist.pipe';
import {AuthService} from '../../services/auth/auth.service';
import {FormsModule} from '@angular/forms';
import {ReviewService} from '../../services/review/review.service';
import {ReviewComponent} from '../review/review.component';
import {ITag} from '../../interfaces/ITag';
import {TagService} from '../../services/tag/tag.service';

@Component({
  selector: 'app-album',
  imports: [
    DatePipe,
    RouterLink,
    FormsModule,
    ReviewComponent
  ],
  templateUrl: './album.component.html',
  standalone: true,
  styleUrl: './album.component.css'
})
export class AlbumComponent implements OnInit{
  private albumService = inject(AlbumService)
  private reviewService = inject(ReviewService)
  private tagService = inject(TagService);
  showTagInput = false;

  album: IAlbum = {
    id: 0,
    title: '',
    artists: [],
    genre: {name: ''},
    releaseDate: new Date(),
    cover: '',
    tags: [],
    tracks: [],
    reviews: []
  };
  reviews: IReview[] = []
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}
  ngOnInit() {
    const id = this.route.snapshot.params['albumId']
    this.albumService.getAlbumById(id).subscribe(a => {
      // console.log(a)
      this.album.id = a.id
      this.album.title = a.title
      this.album.cover = a.cover
      this.album.releaseDate = a.releaseDate
      this.album.tags = a.tags
      this.album.tracks = a.tracks
      this.album.reviews = a.reviews
      this.album.artists = a.artists
      this.album.genre = a.genre
    })
    console.log(this.album)
    console.log(this.reviews)
  }
  get isLoggedIn(): boolean {
    return this.authService.isAuth;
  }
  addTag(str: string) {
    // Логика добавления тега
    const tag: ITag = {name: str}
    this.tagService.createTag(tag, this.album.id).subscribe(data => console.log(data))
    this.album.tags.push(tag)
    this.showTagInput=false
  }

  addReview(review: { rating: number; text: string }, albumId: number) {
    const rev:IReviewRequest = {
      albumId: albumId,
      id: 0,
      rating: review.rating,
      reviewDate: new Date(),
      text: review.text,
      username: localStorage.getItem("username")!

    }
    this.reviewService.createReview(rev).subscribe( r => {
        this.album.reviews.unshift(rev);
      }
    )
    console.log(review)
  }





}
