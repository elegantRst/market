import React from "react";
import { useAppDispatch } from "redux/store";

import { setMenuUrlValue } from "redux/filters/slice";

import Sliders from "../components/Content/Blocks/Sliders/Sliders";
import Offers from "../components/Content/Blocks/Offers/Offers";
import Gallery from "../components/Content/Blocks/Gallery/Gallery";
import Blog from "../components/Content/Blocks/Blog/Blog";
import Brands from "../components/Content/Blocks/Brands/Brands";
import Feedback from "../components/Content/Blocks/Feedback/Feedback";
import { menuList } from "redux/filters/consts";

const HomePage = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setMenuUrlValue(menuList[0]));
  }, []);

  return (
    <>
      <Sliders />
      <Offers />
      <Gallery />
      <Blog />
      <Brands />
      <Feedback />
    </>
  );
};

export default HomePage;
