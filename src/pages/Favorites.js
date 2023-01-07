import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import ThemeContext from '../context/ThemeContext';
import HeaderHorizontal from '../components/HeaderHorizontal';
import HeaderPages from '../components/HeaderPages';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteList: [],
      loading: false,
      targetCheck: true,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const response = await getFavoriteSongs();
    this.setState({ favoriteList: response }, () => {
      this.setState({ loading: false });
    });
  }

  favorite = async (track, index) => {
    const { favoriteList, targetCheck } = this.state;
    const newTracks = [...favoriteList];
    const currenttrack = newTracks[index].favorite;
    newTracks[index].favorite = !currenttrack;
    this.setState({ favoriteList: newTracks }, () => {
      this.setState({ loading: true, targetCheck: !targetCheck }, async () => {
        await removeSong(track);
        const response = await getFavoriteSongs();
        this.setState({ favoriteList: response }, () => {
          this.setState({ loading: false });
        });
      });
    });
  }

  render() {
    const { loading, favoriteList } = this.state;
    const { secondaryTheme } = this.context;
    return (
      <div className={ `favorite-container ${secondaryTheme}` }>
        <HeaderHorizontal />
        <Header />
        <HeaderPages />
        {
          loading ? (
            <div className={ `loading-search-container ${secondaryTheme}` }>
              <Loading />
            </div>
          )
            : (
              <main data-testid="page-favorites">
                <div className={ `page-favorites-container ${secondaryTheme}` }>
                  <div className="header-favorites-container">
                    {
                      favoriteList.length > 0
                        ? <h1>Músicas Favoritas</h1>
                        : <h1>Você ainda não adicionou nenhuma música</h1>
                    }
                  </div>
                  {favoriteList.map((track, index) => {
                    const {
                      previewUrl,
                      trackName,
                      trackId,
                      artworkUrl100,
                      artistName,
                      collectionName } = track;
                    return (
                      <div className={ `all-favorites-musics ${secondaryTheme}` } key={ trackId }>
                        <div className="albuns-favorites">
                          <img src={ artworkUrl100 } alt={ artistName } />
                          <h1>{collectionName}</h1>
                          <h3>{artistName}</h3>
                        </div>
                        <div className="music-player-favorite">
                          <MusicCard
                            key={ trackId }
                            trackName={ trackName }
                            previewUrl={ previewUrl }
                            trackId={ trackId }
                            tracks={ favoriteList }
                            favorite={ () => this.favorite(track, index) }
                            loading={ loading }
                            favoriteCheck={ track.favorite }
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </main>
            )
        }
      </div>
    );
  }
}

Favorites.contextType = ThemeContext;

export default Favorites;
