import { useEffect } from "react";
import { useAppDispatch } from "redux/store";

import { setMenuUrlValue } from "redux/filters/slice";

import Breadcrumbs from "components/Content/Blocks/Breadcrumbs/Breadcrumbs";
import Subscribe from "components/Content/Blocks/Subscribe/Subscribe";
import Cart from "components/Content/Blocks/Cart/Cart";
import { useSelector } from "react-redux";
import { SelectFilters } from "redux/filters/selectors";

const CartPage = () => {
  const { menuUrlValue } = useSelector(SelectFilters);
  const dispatch = useAppDispatch();
  const pageTitle: string = "Корзина";

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setMenuUrlValue(""));
  }, [menuUrlValue]);

  return (
    <>
      <Breadcrumbs pageTitle={pageTitle} />
      <Cart />
      <Subscribe />
    </>
  );
};

export default CartPage;
