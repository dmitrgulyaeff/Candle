import './Header.scss';
import ThemeToggler from '../ThemeToggler/ThemeToggler';

function Header() {
  return (
    <div className="head">
      <div className="head__theme-toggler">
        <ThemeToggler />
      </div>
      <div className="head__image" />
      <div className="head__title">Candle</div>
    </div>
  );
}

export default Header;
