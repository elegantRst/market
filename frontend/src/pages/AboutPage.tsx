import { useEffect } from "react";

import { setMenuUrlValue } from "redux/filters/slice";

import About from "components/Content/Blocks/About/About";
import Subscribe from "components/Content/Blocks/Subscribe/Subscribe";
import Breadcrumbs from "components/Content/Blocks/Breadcrumbs/Breadcrumbs";
import { useAppDispatch } from "redux/store";

const AboutPage = () => {
  const dispatch = useAppDispatch();
  const pageTitle: string = "О нас";

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setMenuUrlValue(""));
  }, []);

  return (
    <>
      <Breadcrumbs pageTitle={pageTitle} />
      <About />
      <Subscribe />
    </>
  );
};

export default AboutPage;
