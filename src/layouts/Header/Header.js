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
        <div className="header__children">{children}</div>
    </header>
  );
}

export default Header;