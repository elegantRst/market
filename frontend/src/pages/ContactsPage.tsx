import { useEffect } from "react";
import { useAppDispatch } from "redux/store";

import { setMenuUrlValue } from "redux/filters/slice";

import Breadcrumbs from "components/Content/Blocks/Breadcrumbs/Breadcrumbs";
import Contacts from "components/Content/Blocks/Contacts/Contacts";
import Subscribe from "components/Content/Blocks/Subscribe/Subscribe";

const ContactsPage = () => {
  const dispatch = useAppDispatch();
  const pageTitle: string = "Контакты";

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setMenuUrlValue(""));
  }, []);

  return (
    <>
      <Breadcrumbs pageTitle={pageTitle} />
      <Contacts />
      <Subscribe />
    </>
  );
};

export default ContactsPage;
