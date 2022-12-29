import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: '',
      theme: 'theme-dark',
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
        {
          loading ? <Loading />
            : <span data-testid="header-user-name">{`Olá: ${user}`}</span>
        }
        <nav>
          <Link to="/search" data-testid="link-to-search">Buscar </Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritas </Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
