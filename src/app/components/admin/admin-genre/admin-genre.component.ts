import {Component, inject, OnInit, signal} from '@angular/core';
import {IGenre} from '../../../interfaces/IGenre';
import {FormBuilder, Validators} from '@angular/forms';
import {AdminModalComponent} from '../admin-modal/admin-modal.component';
import {GenreService} from '../../../services/genre/genre.service';

@Component({
  selector: 'app-admin-genre',
  imports: [AdminModalComponent],
  templateUrl: './admin-genre.component.html',
  styleUrl: '../admin-album/admin-album.component.css'
})
export class AdminGenreComponent implements OnInit{

  genres: IGenre[] = []
  private genreService = inject(GenreService)
  private fb = inject(FormBuilder);
  showModal = signal(false);
  modalTitle = signal('Добавить жанр');
  currentGenreId = signal<number | null>(null);
  formFields = [
    {name: 'name', label: 'Название', type: 'text', required: true},
    // {name: 'id', label: 'Id жанра', type: 'number', required: false},
  ];
  genreForm = this.fb.group({
    name: ['', Validators.required],
    id: [0],
  });

  ngOnInit(): void {
    this.genreService.getAll().subscribe(data => this.genres.push(...data))
  }


  openAdd() {
    this.modalTitle.set('Добавить жанр');
    this.currentGenreId.set(null);
    this.genreForm.reset();
    this.showModal.set(true);
  }
  openEdit(genre: IGenre) {
    this.modalTitle.set('Редактировать жанр');
    this.currentGenreId.set(genre.id);
    this.genreForm.patchValue({
      name: genre.name,
      id:genre.id,
    });
    this.showModal.set(true);
  }
  saveGenre() {
    if (this.genreForm.invalid) return;
    console.log(this.genreForm.value)
    const g: IGenre = {id: this.genreForm.value.id!, name: this.genreForm.value.name!}
    this.genreService.createGenre(g).subscribe(data => {
      g.id = data.id
      g.name = data.name
    })
    this.genres.push(g)
    this.closeModal();
  }

  deleteGenre(id: number) {
    if (confirm('Удалить жанр?')) {
      this.genreService.deleteGenre(id).subscribe(d => console.log("deleted " + d))
      this.genres = this.genres.filter(g => g.id !== id)
    }
  }
  closeModal() {
    this.showModal.set(false);
  }
}
