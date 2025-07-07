export type ReviewType = {
  id: number;
  productId: number;
  date: string;
  time: string;
  rating: string;
  feedbackEmail: string;
  feedbackName: string;
  feedbackMessage: string;
};

export type ReviewInProfileType = {
  productId: number;
  date: string;
  time: string;
  rating: string;
  feedbackEmail: string;
  feedbackName: string;
  feedbackMessage: string;
  createdAt: string;
  updatedAt: string;
  id: number;
};

export interface ReviewsSliceState {
  reviews: ReviewType[];
  reviewsAll: ReviewType[];
  reviewsInProfile: ReviewInProfileType[];
  reviewsCount: number;
  addedReview: ReviewType;
  reviewRating: string;
  status: string;
  statusAll: string;
  postReviewStatus: string;
  postReviewInProfileStatus: string;
}
