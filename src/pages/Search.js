import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import HeaderHorizontal from '../components/HeaderHorizontal';
import HeaderPages from '../components/HeaderPages';
// import ToggleDarkMode from '../components/ToggleDarkMode';
import ThemeContext from '../context/ThemeContext';
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
    };
  }

  handler = ({ target: { value } }) => {
    this.setState({ searchInput: value }, () => {
      const limitCaracteresSearch = 2;
      const isDisable = value.length < limitCaracteresSearch;
      this.setState({ validButtonSearch: isDisable });
    });
  }

clickSearch = async (event) => {
  const { searchInput } = this.state;
  event.preventDefault();
  this.setState({ loading: true, currentSearch: searchInput });
  const response = await searchAlbumsAPI(searchInput);
  this.setState({ albumSearch: response, searchInput: '' }, () => {
    this.setState({ loading: false, validSearchItens: true });
  });
}

validSearchItens = () => {
  const { validSearchItens, albumSearch } = this.state;
  return validSearchItens && albumSearch.length === 0
    ? <div className="not-result-search-container">Nenhum álbum foi encontrado</div>
    : <div />;
}

render() {
  const {
    searchInput,
    validButtonSearch,
    loading,
    albumSearch,
    currentSearch } = this.state;
  const { secondaryTheme, theme } = this.context;
  return (
    <div className="search-container">
      <HeaderHorizontal />
      <Header />
      <HeaderPages />
      {
        loading ? <Loading />
          : (
            <main className={ secondaryTheme } data-testid="page-search">
              <form>
                <div className="input-container">
                  <input
                    type="text"
                    data-testid="search-artist-div"
                    placeholder="Digite sua pesquisa"
                    value={ searchInput }
                    onChange={ this.handler }
                  />

                  <button
                    type="submit"
                    data-testid="search-artist-button"
                    disabled={ validButtonSearch }
                    onClick={ this.clickSearch }
                  >
                    <AiOutlineSearch size="25px" color="#FFFFFF" />
                    <span> Pesquisar </span>
                  </button>
                </div>
              </form>
              {
                albumSearch.length > 0
                  ? (
                    <div className={ `result-search-container ${secondaryTheme}` }>
                      <div className={ `title-container ${secondaryTheme}` }>
                        {`Resultado de álbuns de: ${currentSearch}`}
                      </div>
                      <div className="all-albuns-container">
                        {albumSearch.map((album) => {
                          const {
                            collectionName,
                            artistName,
                            artworkUrl100,
                            collectionId } = album;
                          return (
                            <div
                              key={ collectionId }
                              className={ `album-container ${theme}` }
                            >
                              <Link
                                to={ `/album/${collectionId}` }
                                data-testid={ `link-to-album-${collectionId}` }
                              >
                                <img src={ artworkUrl100 } alt={ collectionName } />
                                <h1 className={ theme }>{collectionName}</h1>
                                <h2 className={ theme }>{artistName}</h2>
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : this.validSearchItens()
              }
            </main>
          )
      }
    </div>
  );
}
}

Search.contextType = ThemeContext;

export default Search;
