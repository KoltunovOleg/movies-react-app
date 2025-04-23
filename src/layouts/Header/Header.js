import './header.scss';

function Header({ backgroundImage, children, renderActionButton }) {
  return (
    <header
      className="header"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="header__top">
        <div className="header__logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        {renderActionButton()}
      </div>
      <div className="header__children">{children}</div>
    </header>
  );
}

export default Header;
