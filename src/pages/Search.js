import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      validButtonSearch: true,
    };
  }

  handler = ({ target: { value } }) => {
    this.setState({ searchInput: value }, () => {
      const limitCaracteresSearch = 2;
      const isDisable = value.length < limitCaracteresSearch;
      this.setState({ validButtonSearch: isDisable });
    });
  }

  render() {
    const { searchInput, validButtonSearch } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
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
            >
              Pesquisar

            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Search;
