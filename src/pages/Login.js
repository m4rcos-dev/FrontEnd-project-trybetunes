import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../assets/logo.svg';
import ToggleDarkMode from '../components/ToggleDarkMode';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nameLogin: '',
      validButtonLogin: true,
      loading: true,
      theme: 'theme-light',
      tooltip: 'tooltip',
    };
  }

  validButtonTrue = () => {
    this.setState({ validButtonLogin: true, tooltip: 'tooltip' });
  }

  validButtonfalse = () => {
    this.setState({ validButtonLogin: false, tooltip: '' });
  }

  handler = ({ target: { value } }) => {
    this.setState({ nameLogin: value }, () => {
      const limitMinCaracteres = 3;
      const isDisable = value.length < limitMinCaracteres;
      if (isDisable) {
        this.setState({ validButtonLogin: true, tooltip: 'tooltip' });
        return;
      }
      this.setState({ validButtonLogin: false, tooltip: '' });
    });
  }

  loginSucess = async (event) => {
    const { history } = this.props;
    const { nameLogin } = this.state;
    event.preventDefault();
    this.setState({ loading: false });
    await createUser({ name: nameLogin });
    history.push('/search');
  }

  render() {
    const { nameLogin, validButtonLogin, loading, theme, tooltip } = this.state;
    return (
      <main className="body-login">
        <div className={ `login-container ${theme}` } data-testid="page-login">
          <img alt="logo" src={ logo } />
          {
            loading
              ? (
                <form>
                  <input
                    type="text"
                    placeholder="Qual é o seu nome?"
                    name="login-name-input"
                    id="name-input"
                    value={ nameLogin }
                    onChange={ this.handler }
                    data-testid="login-name-input"
                  />
                  <button
                    className={ tooltip }
                    data-tooltip="Digite seu nome acima!"
                    data-testid="login-submit-button"
                    type="submit"
                    disabled={ validButtonLogin }
                    onClick={ this.loginSucess }
                  >
                    ENTRAR
                  </button>
                  <div className="toogle-container">
                    <ToggleDarkMode />
                  </div>
                </form>
              ) : <Loading />
          }
        </div>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
