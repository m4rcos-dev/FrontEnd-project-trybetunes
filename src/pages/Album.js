import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumName: '',
      artistName: '',
      artistImage: '',
      tracks: [],
      loading: false,
      targetCheck: false,
      favoriteSongs: [],
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    const { artistName, artworkUrl100, collectionName } = response[0];
    const tracks = response.slice(1);
    const favoriteTrack = tracks.map((track) => {
      const newTracks = { ...track, favorite: false };
      return newTracks;
    });
    const responseFavoriteSong = await getFavoriteSongs();
    this.setState({
      albumName: collectionName,
      artistName,
      artistImage: artworkUrl100,
      tracks: favoriteTrack,
      favoriteSongs: responseFavoriteSong }, () => {
      const { favoriteSongs } = this.state;
      if (favoriteSongs.length > 0) {
        const tracksIds = favoriteSongs.map((song) => song.trackId);
        const indexArr = [];
        tracks.forEach((song, index) => {
          if (tracksIds.includes(song.trackId)) {
            indexArr.push(index);
          }
        });
        indexArr.forEach((i) => {
          const newState = { ...this.state };
          newState.tracks[i].favorite = true;
        });
        console.log(tracksIds);
        console.log(indexArr);
      }
      this.setState({ loading: false });
    });
  }

  favorite = async ({ target: { checked } }, track, index) => {
    const { tracks, targetCheck } = this.state;
    const newTracks = [...tracks];
    const currenttrack = newTracks[index].favorite;
    newTracks[index].favorite = !currenttrack;
    this.setState({ loading: true, tracks: newTracks }, () => {
      this.setState({ targetCheck: !targetCheck }, async () => {
        const valid = checked ? await addSong(track) : await removeSong(track);
        this.setState({ loading: false });
        return valid;
      });
    });
  }

  render() {
    const {
      albumName,
      artistName,
      artistImage,
      tracks,
      loading,
      targetCheck } = this.state;
    return (
      <>
        <Header />
        {
          loading ? <Loading />
            : (
              <div data-testid="page-album">
                <img src={ artistImage } alt={ artistName } />
                <h1 data-testid="album-name">{albumName}</h1>
                <h3 data-testid="artist-name">{artistName}</h3>
                {
                  tracks.map((track, index) => {
                    const { previewUrl, trackName, trackId } = track;
                    return (<MusicCard
                      key={ trackId }
                      trackName={ trackName }
                      previewUrl={ previewUrl }
                      trackId={ trackId }
                      tracks={ tracks }
                      favorite={ (event) => this.favorite(event, track, index) }
                      loading={ loading }
                      favoriteCheck={ track.favorite }
                      targetCheck={ targetCheck }
                    />);
                  })
                }
              </div>
            )
        }
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
