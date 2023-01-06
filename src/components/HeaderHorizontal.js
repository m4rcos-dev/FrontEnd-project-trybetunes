import React, { Component } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { HiOutlineMenu } from 'react-icons/hi';
import { MdFavoriteBorder } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import ThemeContext from '../context/ThemeContext';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class HeaderHorizontal extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: '',
      imageUser: '',
      statusMenu: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const userGet = await getUser();
      this.setState({
        user: userGet.name,
        imageUser: userGet.image,
        loading: false,
        statusMenu: false });
    });
  }

  handleStatusMenu = () => {
    const { statusMenu } = this.state;
    this.setState({ statusMenu: !statusMenu });
  }

  render() {
    const { loading, imageUser, user, statusMenu } = this.state;
    const { theme, secondaryTheme } = this.context;
    return (
      <div className={ `header-horizontal-container ${theme}` }>
        <div className="menu-container">
          <button type="button" className={ theme } onClick={ this.handleStatusMenu }>
            <HiOutlineMenu size="20px" />
          </button>
          { statusMenu ? (
            <nav className={ `${statusMenu} ${secondaryTheme}` }>
              <Link to="/search" data-testid="link-to-search">
                <AiOutlineSearch />
                Buscar
              </Link>
              <Link to="/favorites" data-testid="link-to-favorites">
                <MdFavoriteBorder />
                Favoritas
              </Link>
              <Link to="/profile" data-testid="link-to-profile">
                <CgProfile />
                Perfil
              </Link>
            </nav>
          ) : ''}
        </div>
        <img alt="logo" src={ Logo } />
        {
          loading ? <Loading />
            : (
              <div className="profile-header-horizontal">
                <img alt="imagem usuário" src={ imageUser } />
                <span data-testid="header-user-name">{user}</span>
              </div>
            )
        }
      </div>
    );
  }
}

HeaderHorizontal.contextType = ThemeContext;

export default HeaderHorizontal;
