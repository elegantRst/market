export const getReviewsFromProfileLS = () => {
  const data = localStorage.getItem("userReviews");
  const reviewsInProfileFromLS = data ? JSON.parse(data) : [];
  return {
    reviewsInProfileFromLS,
  };
};
