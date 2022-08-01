import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nameLogin: '',
      validButtonLogin: true,
      loading: true,
    };
  }

  handler = ({ target: { value } }) => {
    this.setState({ nameLogin: value }, () => {
      const limitMinCaracteres = 3;
      const isDisable = value.length < limitMinCaracteres;
      this.setState({ validButtonLogin: isDisable });
    });
  }

  loginSucess = async (event) => {
    const { history } = this.props;
    event.preventDefault();
    this.setState({ loading: false });
    await createUser({ name: 'Name' });
    history.push('/search');
  }

  render() {
    const { nameLogin, validButtonLogin, loading } = this.state;
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        {
          loading
            ? (
              <form>
                <label htmlFor="name-input">
                  Nome:
                  <input
                    type="text"
                    name="login-name-input"
                    id="name-input"
                    value={ nameLogin }
                    onChange={ this.handler }
                    data-testid="login-name-input"
                  />
                </label>
                <button
                  data-testid="login-submit-button"
                  type="submit"
                  disabled={ validButtonLogin }
                  onClick={ this.loginSucess }
                >
                  Entrar
                </button>
              </form>
            ) : <Loading />
        }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
