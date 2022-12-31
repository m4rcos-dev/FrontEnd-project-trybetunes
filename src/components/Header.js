import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdFavoriteBorder } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import Logo from '../assets/logo.svg';
import ToggleDarkMode from './ToggleDarkMode';
import ThemeContext from '../context/ThemeContext';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: '',
    };
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const userGet = await getUser();
      this.setState({ user: userGet.name, loading: false });
    });
  }

  render() {
    const { loading, user } = this.state;
    const { theme } = this.context;
    return (
      <header className={ `drawer-container ${theme}` } data-testid="header-component">
        <div className="logo-container">
          <img alt="logo" src={ Logo } />
          <div className="toogle-container">
            <ToggleDarkMode />
          </div>
        </div>
        <nav>
          <Link to="/search" data-testid="link-to-search">
            <div>
              <AiOutlineSearch />
            </div>
            Buscar
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            <div>
              <MdFavoriteBorder />
            </div>
            Favoritas
          </Link>
          <Link to="/profile" data-testid="link-to-profile">
            <div>
              <CgProfile />
            </div>
            Perfil
          </Link>
        </nav>
        {
          loading ? <Loading />
            : <span data-testid="header-user-name">{`Olá: ${user}`}</span>
        }
      </header>
    );
  }
}

Header.contextType = ThemeContext;

export default Header;
