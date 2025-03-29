export interface IReview {
  id: number
  username: string
  text: string
  rating: number
  reviewDate: Date
}

export interface IReviewRequest extends IReview{
  albumId: number
}
