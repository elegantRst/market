import { useState } from "react";
import { useEffect } from "react";

import CartModal from "components/Content/Elements/Modals/CartModal";
import HeaderSettings from "./HeaderSettings/HeaderSettings";
import HeaderInfo from "./HeaderInfo/HeaderInfo";
import HeaderMain from "./HeaderMain/HeaderMain";

import styles from "./Header.module.scss";
import OrderModal from "components/Content/Elements/Modals/OrderModal";
import AuthModal from "components/Content/Elements/Modals/AuthModal";

const Header: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header className={scrollPosition <= 150 ? styles.header : `${styles.header} ${styles.fixed}`}>
        <HeaderSettings />
        <HeaderInfo />
        <HeaderMain scrollPosition={scrollPosition} />
        <CartModal />
        <OrderModal />
        <AuthModal />
      </header>
    </>
  );
};

export default Header;
