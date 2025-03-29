import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IReviewRequest} from '../../interfaces/IReview';
import {ReviewService} from '../../services/review/review.service';
import {ReviewComponent} from '../review/review.component';

@Component({
  selector: 'app-user',
  imports: [ReviewComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private reviewService: ReviewService
  ) {}
  username = "user"
  reviews: IReviewRequest[] = []
  ngOnInit() {
    this.username = this.route.snapshot.params['username']
    this.reviewService.getReviewsByUsername(this.username).subscribe(data => {
      this.reviews.push(...data);

      console.log(data)
      }
    );
    // console.log(this.reviews)
  }

}
