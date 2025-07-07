import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReviewItem from "../../Reviews/ReviewItem";
import { ReviewType } from "redux/getReview/types";
import { SelectReviews } from "redux/getReview/selectors";
import { normalize_count_form_reviews } from "utils/normalizeWordsForm";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import styles from "../Profile.module.scss";

const ProfileReviews: React.FC = () => {
  const [showedReviews, setShowedReviews] = useState<ReviewType[]>([]);
  const initialCountReviewToShow = 2;
  const [indexArray, setIndexArray] = useState<number>(initialCountReviewToShow);
  const { reviewsInProfile } = useSelector(SelectReviews);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = (e) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      setIndexArray((prevCount) => prevCount + 1);
    }
  };

  const isMoreReviewsToLoad = reviewsInProfile.length > showedReviews.length;

  useEffect(() => {
    if (isMoreReviewsToLoad) {
      setShowedReviews(reviewsInProfile.slice(0, indexArray));
    }
  }, [reviewsInProfile, indexArray]);

  return (
    <>
      <div className={styles.title}>
        Мои отзывы
        <span>
          {reviewsInProfile.length} {normalize_count_form_reviews(reviewsInProfile.length)}
        </span>
      </div>
      <div className={styles.review__items}>
        {Object.values(showedReviews).map((item: ReviewType, index: number) => (
          <ReviewItem item={item} key={index} ix={index} initialCountReviewToShow={initialCountReviewToShow} />
        ))}
        {isMoreReviewsToLoad && (
          <div className={styles.review__items_arrowDown}>
            <ExpandMoreIcon data-aos="fade-down" data-aos-duration="1000" data-aos-delay="2000" />
            <ExpandMoreIcon data-aos="fade-down" data-aos-duration="1000" data-aos-delay="1500" />
            <ExpandMoreIcon data-aos="fade-down" data-aos-duration="1000" data-aos-delay="500" />
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileReviews;
