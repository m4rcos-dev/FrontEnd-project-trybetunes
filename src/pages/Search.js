import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      currentSearch: '',
      validButtonSearch: true,
      loading: false,
      validSearchItens: false,
      albumSearch: [],
      theme: 'theme-dark',
    };
  }

  handler = ({ target: { value } }) => {
    this.setState({ searchInput: value }, () => {
      const limitCaracteresSearch = 2;
      const isDisable = value.length < limitCaracteresSearch;
      this.setState({ validButtonSearch: isDisable });
    });
  }

clickSearch = async () => {
  const { searchInput } = this.state;
  this.setState({ loading: true, currentSearch: searchInput });
  const response = await searchAlbumsAPI(searchInput);
  this.setState({ albumSearch: response, searchInput: '' }, () => {
    this.setState({ loading: false, validSearchItens: true });
  });
}

validSearchItens = () => {
  const { validSearchItens, albumSearch } = this.state;
  return validSearchItens && albumSearch.length === 0
    ? <h1>Nenhum álbum foi encontrado</h1>
    : <div />;
}

render() {
  const {
    searchInput,
    validButtonSearch,
    loading,
    albumSearch,
    currentSearch,
    theme } = this.state;
  return (
    <div className="search-container">
      <Header />
      {
        loading ? <Loading />
          : (
            <main className={ theme } data-testid="page-search">
              <header>
                <form>
                  <input
                    type="text"
                    data-testid="search-artist-input"
                    value={ searchInput }
                    onChange={ this.handler }
                  />
                  <button
                    type="button"
                    data-testid="search-artist-button"
                    disabled={ validButtonSearch }
                    onClick={ this.clickSearch }
                  >
                    Pesquisar
                  </button>
                </form>
              </header>
              <div>
                {
                  albumSearch.length > 0
                    ? (
                      <div>
                        <h1>{`Resultado de álbuns de: ${currentSearch}`}</h1>
                        {albumSearch.map((album) => {
                          const {
                            collectionName,
                            artistName,
                            artworkUrl100,
                            collectionId } = album;
                          return (
                            <div key={ collectionId }>
                              <Link
                                to={ `/album/${collectionId}` }
                                data-testid={ `link-to-album-${collectionId}` }
                              >
                                <img src={ artworkUrl100 } alt={ collectionName } />
                                <h1>{collectionName}</h1>
                                <h2>{artistName}</h2>
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    ) : this.validSearchItens()
                }
              </div>
            </main>
          )
      }
    </div>
  );
}
}

export default Search;
