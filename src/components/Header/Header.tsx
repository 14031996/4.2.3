import Style from "./Header.style.module.scss";

export const Header = () => {
  return (
    <header className={Style.header}>
      <div className={Style.logo}>
        <span className={Style["logo-icon"]}>hh</span>
        <span>.FrontEnd</span>
      </div>

      <nav className={Style.navigation}>
        <a href="#" className={Style["active-link"]}>
          Вакансии FE
          <span className={Style.dot} />
        </a>

        <span className={Style["about-link"]}>Обо мне</span>
      </nav>
    </header>
  );
};
