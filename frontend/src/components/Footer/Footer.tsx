import { Link } from "react-router-dom";

import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footer__main}>
          <div className="container">
            <div className={styles.footer__main_inner}>
              <div className={styles.footer__main_item}>
                <div className={styles.footer__main_title}>Информация</div>
                <ul className={styles.footer__main_list}>
                  <li>
                    <Link className={styles.footer__main_link} to="/about">
                      О компании
                    </Link>
                  </li>
                  <li>
                    <Link className={styles.footer__main_link} to="/contacts">
                      Контакты
                    </Link>
                  </li>
                </ul>
              </div>
              <div className={styles.footer__main_item}>
                <div className={styles.footer__main_title}>Условия</div>
                <ul className={styles.footer__main_list}>
                  <li>
                    <Link className={styles.footer__main_link} to="/delivery">
                      Доставка
                    </Link>
                  </li>
                  <li>
                    <Link className={styles.footer__main_link} to="/payment">
                      Оплата
                    </Link>
                  </li>
                  <li>
                    <Link className={styles.footer__main_link} to="/partnership">
                      Партнерство
                    </Link>
                  </li>
                </ul>
              </div>
              <div className={styles.footer__main_item}>
                <div className={styles.footer__main_title}>Товары</div>
                <ul className={styles.footer__main_list}>
                  <li>
                    <Link className={styles.footer__main_link} to="/catalog">
                      Каталог
                    </Link>
                  </li>
                  <li>
                    <Link className={styles.footer__main_link} to="/showroom">
                      Шоу-рум
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer__copy}>
          <div className="container">
            <div className={styles.footer__copy_inner}>
              <div className={styles.footer__copy_text}>
                ©Copyright 2019
                <a className={styles.footer__copy_link} href="#">
                  Albero
                </a>
                | Все права защищены
              </div>
              <div className={styles.footer__copy_socials}>
                <a className={`${styles.footer__copy_social} icon_facebook_square`} href="#"></a>
                <a className={`${styles.footer__copy_social} icon_twitter_square`} href="#"></a>
                <a className={`${styles.footer__copy_social} icon_linkedin_square`} href="#"></a>
                <a className={`${styles.footer__copy_social} icon_pinterest_square`} href="#"></a>
                <a className={`${styles.footer__copy_social} icon_google_plus_square`} href="#"></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
