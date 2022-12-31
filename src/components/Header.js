import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import Logo from '../assets/logo.svg';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: '',
      theme: 'theme-ligth',
    };
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const userGet = await getUser();
      this.setState({ user: userGet.name, loading: false });
    });
  }

  render() {
    const { loading, user, theme } = this.state;
    return (
      <header className={ `drawer-container ${theme}` } data-testid="header-component">
        <img alt="logo" src={ Logo } />
        <nav>
          <Link to="/search" data-testid="link-to-search">Buscar </Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritas </Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
        {
          loading ? <Loading />
            : <span data-testid="header-user-name">{`Olá: ${user}`}</span>
        }
      </header>
    );
  }
}

export default Header;
