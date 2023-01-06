import React from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../context/ThemeContext';

class MusicCard extends React.Component {
  render() {
    const {
      previewUrl,
      trackName,
      trackId,
      favorite,
      favoriteCheck } = this.props;
    const { secondaryTheme } = this.context;
    return (
      <div className={ `music-container ${secondaryTheme}` }>
        <h3>{trackName}</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          <input
            type="checkbox"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ favorite }
            checked={ favoriteCheck }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  favorite: PropTypes.func.isRequired,
  favoriteCheck: PropTypes.bool.isRequired,
};

MusicCard.contextType = ThemeContext;

export default MusicCard;
