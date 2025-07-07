import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setMenuUrlValue } from "redux/filters/slice";

import Search from "components/Content/Elements/Search/Search";

import styles from "../Header.module.scss";
import { SelectFilters } from "redux/filters/selectors";
import { MenuList } from "redux/filters/types";
import { menuList } from "redux/filters/consts";

type HeaderMainProps = {
  scrollPosition: number;
};

const HeaderMain: React.FC<HeaderMainProps> = ({ scrollPosition }) => {
  const dispatch = useDispatch();
  const { menuUrlValue } = useSelector(SelectFilters);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const onClickMenuItem = (item: MenuList) => {
    dispatch(setMenuUrlValue(item));
  };

  useEffect(() => {
    menuList.map((item) => {
      if (url.includes(item.url)) {
        dispatch(setMenuUrlValue(item));
      }
    });
  }, [menuUrlValue]);

  return (
    <div className={styles.header__main}>
      <div className="container">
        <div className={styles.header__main_inner}>
          <Search scrollPosition={scrollPosition} />
          <div className={styles.menu__burger_btn}>
            <span></span>
          </div>
          <div className={styles.menu__burger}>
            <ul className={styles.menu__burger_list}>
              {menuList.map((item, index) => (
                <li key={index}>
                  <Link className={styles.menu__burger_link} to="/">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <nav className={styles.menu}>
            <ul className={styles.menu__list}>
              {menuList.map((item, index) => (
                <li className={menuUrlValue.id === index ? `${styles.menu__item} ${styles.active}` : styles.menu__item} key={index} onClick={() => onClickMenuItem(item)}>
                  <Link className={styles.menu__link} to={item.url}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
