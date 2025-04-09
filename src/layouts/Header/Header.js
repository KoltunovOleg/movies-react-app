import './header.scss';

function Header({ backgroundImage, pageTitle, logo, children }) {
  return (
    <header
      className="header"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
        <div className="header__logo">
            <img src={logo} alt="Logo" />
        </div>
        <div className="header__content">
            <h1 className="header__title">{pageTitle}</h1>
            <div className="header__children">{children}</div>
        </div>
    </header>
  );
}

export default Header;