import React from 'react';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

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
    return (
      <header data-testid="header-component">
        {
          loading ? <Loading />
            : <span data-testid="header-user-name">{`Olá: ${user}`}</span>
        }
      </header>
    );
  }
}

export default Header;
