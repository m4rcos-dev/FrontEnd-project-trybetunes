import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      infoProfile: [],
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const response = await getUser();
    this.setState({ infoProfile: response }, () => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { loading, infoProfile } = this.state;
    const { description, email, image, name } = infoProfile;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading ? <Loading />
            : (
              <div>
                <img data-testid="profile-image" src={ image } alt={ name } />
                <h2>Nome:</h2>
                <h4>{name}</h4>
                <h4>{name}</h4>
                <h3>Email:</h3>
                <p>{email}</p>
                <h3>Descrição:</h3>
                <p>{description}</p>
                <div>
                  <Link
                    to="/profile/edit"
                  >
                    Editar perfil
                  </Link>
                </div>
              </div>
            )
        }
      </div>
    );
  }
}

export default Profile;
