import React, { Component } from 'react';
import { HiOutlineMenu } from 'react-icons/hi';
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
    };
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const userGet = await getUser();
      this.setState({ user: userGet.name, imageUser: userGet.image, loading: false });
    });
  }

  render() {
    const { loading, imageUser, user } = this.state;
    const { theme } = this.context;
    return (
      <div className={ `header-horizontal-container ${theme}` }>
        <HiOutlineMenu />
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
