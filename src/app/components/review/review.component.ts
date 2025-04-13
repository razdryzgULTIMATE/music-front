import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IReview, IReviewRequest} from '../../interfaces/IReview';
import {FormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {StarsPipe} from '../../pipes/rating/stars.pipe';

@Component({
  selector: 'app-review',
  imports: [FormsModule, DatePipe, StarsPipe],
  templateUrl: './review.component.html',
  standalone: true,
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  @Input() reviews: IReview[] = [];
  @Input() albumId: number = 0;
  @Input() albumTitle = ''
  @Input() isAuth: boolean = false;
  @Output() reviewSubmitted = new EventEmitter<{ rating: number; text: string }>();
  showReviewModal = false;
  selectedRating = 0;
  reviewText = '';

  openReviewModal() {
    this.showReviewModal = true;
    this.selectedRating = 0;
    this.reviewText = '';
  }

  submitReview() {
    const rev: IReviewRequest = {
      albumId: this.albumId,
      id: 0,
      rating: this.selectedRating,
      reviewDate: new Date(),
      text: this.reviewText,
      username: localStorage.getItem("username")!
    }
    this.reviewSubmitted.emit(rev);
    this.showReviewModal = false;
  }
}
