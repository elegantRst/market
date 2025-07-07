import React from "react";
import { useDispatch } from "react-redux";

import { setRating } from "redux/getReview/slice";

import ReactStars from "react-rating-stars-component";

import styles from "./StarRating.module.scss";

type StarRatingProps = {
  rating: string | undefined;
  editValue: boolean;
  size?: number;
};

const StarRating: React.FC<StarRatingProps> = ({ rating, editValue, size }) => {
  const dispatch = useDispatch();

  const componentRatingValue = rating ? rating : 1;

  const ratingChanged = (newRating: number) => {
    dispatch(setRating(newRating));
  };

  let starSize = 0;
  if (size) {
    starSize = size;
  } else {
    starSize = 30;
  }

  return (
    <div className={styles.starbox}>
      <ReactStars value={Number(componentRatingValue)} count={5} size={starSize} activeColor="#ffd700" color={"#454545"} edit={editValue} allowHalf isHalf={true} onChange={ratingChanged} />
    </div>
  );
};

export default StarRating;
