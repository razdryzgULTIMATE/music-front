import {Component, inject, signal} from '@angular/core';
import {IReviewRequest} from '../../../interfaces/IReview';
import {FormBuilder, Validators} from '@angular/forms';
import {ReviewService} from '../../../services/review/review.service';
import {StarsPipe} from '../../../pipes/rating/stars.pipe';
import {AdminModalComponent} from '../admin-modal/admin-modal.component';

@Component({
  selector: 'app-admin-review',
  imports: [StarsPipe, AdminModalComponent],
  templateUrl: './admin-review.component.html',
  standalone: true,
  styleUrl: '../admin-album/admin-album.component.css'
})
export class AdminReviewComponent {
  reviews: IReviewRequest[] = []
  private reviewService = inject(ReviewService)
  private fb = inject(FormBuilder);
  showModal = signal(false);
  modalTitle = signal('Добавить отзыв');
  currentGenreId = signal<number | null>(null);
  formFields = [
    {name: 'username', label: 'Название', type: 'text', required: true},
    {name: 'rating', label: 'Оценка', type: "number", required: true},
    {name: 'text', label: "Текст", type: "text", required: true},
    {name: "reviewDate", label: 'Дата написания отзыва', type: "date", required: true},
    {name: 'albumId', label: "Id альбома", type: 'number', required: true}
  ];
  reviewForm = this.fb.group({
    username: ['', Validators.required],
    id: [0],
    rating: [0, Validators.required],
    reviewDate: ['', Validators.required],
    text: ['', Validators.required],
    albumId: [0, Validators.required]
  });

  ngOnInit(): void {
    this.reviewService.getAll().subscribe(data => this.reviews.push(...data))
  }

  openAdd() {
    this.modalTitle.set('Добавить отзыв');
    this.currentGenreId.set(null);
    this.reviewForm.reset();
    this.showModal.set(true);
  }

  openEdit(review: IReviewRequest) {
    this.modalTitle.set('Редактировать отзыв');
    this.currentGenreId.set(review.id);
    this.reviewForm.patchValue({
      username: review.username,
      text: review.text,
      albumId: review.albumId,
      reviewDate: review.reviewDate.toString(),
      rating: review.rating,
      id: review.id
    })
    this.showModal.set(true);
  }

  save() {
    if (this.reviewForm.invalid) return;
    console.log(this.reviewForm.value)
    const r: IReviewRequest = {
      albumId: this.reviewForm.value.albumId!,
      id: this.reviewForm.value.id!,
      rating: this.reviewForm.value.rating!,
      reviewDate: new Date(this.reviewForm.value.reviewDate!),
      text: this.reviewForm.value.text!,
      username: this.reviewForm.value.username!
    }
    this.reviewService.createReview(r).subscribe(data => this.reviews.push(data))
    this.closeModal();
  }

  delete(id: number) {
    if (confirm('Удалить отзыв?')) {
      this.reviewService.deleteReview(id).subscribe()
      this.reviews = this.reviews.filter(r => r.id !== id)
    }
  }

  closeModal() {
    this.showModal.set(false);
  }

}
