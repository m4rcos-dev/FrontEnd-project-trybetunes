import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumName: '',
      artistName: '',
      artistImage: '',
      tracks: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    const { artistName, artworkUrl100, collectionName } = response[0];
    this.setState({
      albumName: collectionName,
      artistName,
      artistImage: artworkUrl100,
      tracks: response.slice(1) });
  }

  render() {
    const { albumName, artistName, artistImage, tracks } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <img src={ artistImage } alt={ artistName } />
          <h1 data-testid="album-name">{albumName}</h1>
          <h3 data-testid="artist-name">{artistName}</h3>
          {
            tracks.map((track) => {
              const { previewUrl, trackName } = track;
              return (<MusicCard
                key={ trackName }
                trackName={ trackName }
                previewUrl={ previewUrl }
              />);
            })
          }
        </div>
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
