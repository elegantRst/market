import { useEffect } from "react";
import { useAppDispatch } from "redux/store";

import { setMenuUrlValue } from "redux/filters/slice";

import NotFound from "components/Content/Blocks/NotFound/NotFound";

const ErrorPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setMenuUrlValue(""));
  }, []);

  return (
    <>
      <NotFound />
    </>
  );
};

export default ErrorPage;
