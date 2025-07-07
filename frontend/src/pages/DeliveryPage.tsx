import { useEffect } from "react";
import { useAppDispatch } from "redux/store";

import { setMenuUrlValue } from "redux/filters/slice";

import Banner from "components/Content/Blocks/Banner/Banner";
import Brands from "components/Content/Blocks/Brands/Brands";
import Breadcrumbs from "components/Content/Blocks/Breadcrumbs/Breadcrumbs";
import Delivery from "components/Content/Blocks/Delivery/Delivery";
import Subscribe from "components/Content/Blocks/Subscribe/Subscribe";
import { menuList } from "redux/filters/consts";

const DeliveryPage = () => {
  const dispatch = useAppDispatch();
  const pageTitle: string = "Условия доставки";

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setMenuUrlValue(menuList[2]));
  }, []);
  return (
    <>
      <Banner />
      <Breadcrumbs pageTitle={pageTitle} />
      <Delivery />
      <Brands />
      <Subscribe />
    </>
  );
};

export default DeliveryPage;
