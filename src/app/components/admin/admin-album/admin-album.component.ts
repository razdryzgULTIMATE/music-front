import {Component, inject, signal} from '@angular/core';
import {FormArray, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {IAlbum} from '../../../interfaces/IAlbum';
import {DatePipe, formatDate} from '@angular/common';
import {AlbumService} from '../../../services/album/album.service';
import {AdminModalComponent} from '../admin-modal/admin-modal.component';
import {ReviewService} from '../../../services/review/review.service';
import {TagService} from '../../../services/tag/tag.service';
import {GenreService} from '../../../services/genre/genre.service';
import {ArtistService} from '../../../services/artist/artist.service';
import {IGenre} from '../../../interfaces/IGenre';
import {IArtist} from '../../../interfaces/IArtist';
import {ITag} from '../../../interfaces/ITag';
import {IAlbumRequest} from '../../../interfaces/IAlbumRequest';
import {FormControlPipe} from '../../../pipes/formControl/form-control.pipe';
import {find} from 'rxjs';

@Component({
  selector: 'app-admin-album',
  imports: [ReactiveFormsModule, DatePipe, AdminModalComponent, FormControlPipe],
  templateUrl: './admin-album.component.html',
  styleUrl: './admin-album.component.css',
  standalone: true
})
export class AdminAlbumComponent {
  // FIXME редактирование альбома
  private albumService = inject(AlbumService)
  private reviewService = inject(ReviewService)
  private tagService = inject(TagService);
  private fb = inject(FormBuilder);
  // private albumService = inject(AlbumService);
  private genreService = inject(GenreService);
  private artistService = inject(ArtistService);
  // private tagService = inject(TagService);

  albums: IAlbum[] = [];
  genres: IGenre[] = [];
  artists: IArtist[] = [];
  tags: ITag[] = [];

  showModal = signal(false);
  modalTitle = signal('Добавить альбом');
  currentAlbumId = signal<number | null>(null);

  albumForm = this.fb.group({
    title: ['', Validators.required],
    releaseDate: ['', Validators.required],
    genreId: ['', Validators.required],
    cover: [''],
    artists: this.fb.array([this.createArtistControl()]),
    tags: this.fb.array([this.createTagControl()])
  });


  ngOnInit(): void {
    this.albumService.getAll().subscribe(data => this.albums = data)
    this.genreService.getAll().subscribe(data => this.genres = data)
    this.tagService.getAll().subscribe(data => this.tags = data)
    this.artistService.getArtists().subscribe(data => this.artists = data)
  }

  get artistControls() {
    return this.albumForm.get('artists') as FormArray;
  }

  get tagControls() {
    return this.albumForm.get('tags') as FormArray;
  }

  createArtistControl(value: string = '') {
    return this.fb.control(value, Validators.required);
  }

  createTagControl(value: string = '') {
    return this.fb.control(value, Validators.required);
  }

  addArtistControl() {
    this.artistControls.push(this.createArtistControl());
  }

  addTagControl() {
    this.tagControls.push(this.createTagControl());
  }

  removeArtistControl(index: number) {
    this.artistControls.removeAt(index);
  }

  removeTagControl(index: number) {
    this.tagControls.removeAt(index);
  }

  openAdd() {
    this.modalTitle.set('Добавить альбом');
    this.currentAlbumId.set(null);
    this.albumForm.reset();
    this.artistControls.clear();
    this.tagControls.clear();
    this.addArtistControl();
    this.addTagControl();
    this.showModal.set(true);
  }

  openEdit(album: IAlbum) {
    this.modalTitle.set('Редактировать альбом');
    this.currentAlbumId.set(album.id);
    console.log("Edit album: \n", album)
    // console.log("Genres: \n", this.genres)
    const genre = this.findGenreByName("Classic")
    if(!genre){
      console.log("genre undefined")
      return
    }
    this.albumForm.patchValue({
      title: album.title,
      releaseDate: formatDate(album.releaseDate, 'yyyy-MM-dd', 'en'),
      genreId: genre.id.toString(),
      cover: album.cover || ''
    });

    this.artistControls.clear();
    album.artists.forEach(artist => {
      this.artistControls.push(this.createArtistControl(artist.id.toString()));
    });

    this.tagControls.clear();
    album.tags.forEach(tag => {
      this.tagControls.push(this.createTagControl(tag.id.toString()));
    });

    this.showModal.set(true);
  }

  private findGenreByName(name: string){
    const copy = [...this.genres]
    return copy.filter(g => g.name === name).pop()
  }
  async saveAlbum() {
    if (this.albumForm.invalid) return;

    const albumData: IAlbumRequest = {
      albumId: 0,
      artistIds: this.artistControls.value,
      genreId: +this.albumForm.value.genreId!,
      releaseDate: new Date(this.albumForm.value.releaseDate!),
      tags: this.tagControls.value,
      title: this.albumForm.value.title!

    };

    if (this.currentAlbumId()) {
      albumData.albumId = this.currentAlbumId()!
      // await this.albumService.update(this.currentAlbumId()!, albumData);
    } else {
      await this.albumService.createAlbum(albumData);
    }

    this.closeModal();
  }

  closeModal() {
    this.showModal.set(false);
  }


  deleteAlbum(id: number){

  }
}
