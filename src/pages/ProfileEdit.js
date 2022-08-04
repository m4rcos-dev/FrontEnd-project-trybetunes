import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      currentName: '',
      email: '',
      image: '',
      description: '',
      loading: false,
      activeButtonSave: true,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const response = await getUser();
    const { name, email, image, description } = response;
    this.setState({
      currentName: name,
      email,
      image,
      description,
    }, () => {
      this.setState({ loading: false });
    });
  }

  validateEmail = (email) => {
    const valid = /\S+@\S+\.\S+/;
    return valid.test(email);
  }

  handleChange = ({ target }) => {
    const { currentName, email, image, description } = this.state;
    const { name } = target;
    const { value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const isDisable = currentName.length === 0
    || email.length === 0
    || image.length === 0
    || description === 0
    || this.validateEmail(email) === false;
      this.setState({ activeButtonSave: isDisable });
    });
  }

  saveEdit = async () => {
    this.setState({ loading: true });
    const { history } = this.props;
    const { currentName, email, image, description } = this.state;
    const infoEdited = {
      name: currentName,
      email,
      image,
      description,
    };
    await updateUser(infoEdited);
    this.setState({ loading: false });
    history.push('/profile');
  }

  render() {
    const { loading,
      currentName,
      email,
      image,
      description,
      activeButtonSave } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          {
            loading ? <Loading />
              : (
                <>
                  <h1>Profile Edit</h1>
                  <form>
                    <img src={ image } alt={ currentName } />
                    <input
                      type="text"
                      id="input-image"
                      data-testid="edit-input-image"
                      name="image"
                      value={ image }
                      onChange={ (event) => this.handleChange(event) }
                    />
                    <label htmlFor="input-name">
                      Nome:
                      <input
                        type="text"
                        id="input-name"
                        data-testid="edit-input-name"
                        name="currentName"
                        value={ currentName }
                        onChange={ (event) => this.handleChange(event) }
                      />
                    </label>
                    <label htmlFor="input-email">
                      Email:
                      <input
                        type="email"
                        id="input-email"
                        data-testid="edit-input-email"
                        name="email"
                        value={ email }
                        onChange={ (event) => this.handleChange(event) }
                      />
                    </label>
                    <label htmlFor="text-description">
                      Descrição:
                      <textarea
                        id="text-description"
                        data-testid="edit-input-description"
                        name="description"
                        value={ description }
                        onChange={ (event) => this.handleChange(event) }
                      />
                    </label>
                    <button
                      disabled={ activeButtonSave }
                      type="button"
                      data-testid="edit-button-save"
                      onClick={ this.saveEdit }
                    >
                      Salvar
                    </button>
                  </form>
                </>
              )
          }
        </div>
      </>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
