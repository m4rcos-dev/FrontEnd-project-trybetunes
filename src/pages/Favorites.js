import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

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
    return (
      <>
        <Header />
        <div data-testid="page-favorites">

          {
            loading ? <Loading />
              : (
                <div>
                  {
                    favoriteList.length > 0
                      ? <h1>Musicas Favoritas:</h1>
                      : <h1>Você ainda não adicionou nenhuma música</h1>
                  }

                  {favoriteList.map((track, index) => {
                    const {
                      previewUrl,
                      trackName,
                      trackId,
                      artworkUrl100,
                      artistName,
                      collectionName } = track;
                    return (
                      <div key={ trackId }>
                        <img src={ artworkUrl100 } alt={ artistName } />
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
                        <h1>{collectionName}</h1>
                        <h3>{artistName}</h3>
                      </div>
                    );
                  })}
                </div>
              )

          }
        </div>
      </>
    );
  }
}

export default Favorites;
