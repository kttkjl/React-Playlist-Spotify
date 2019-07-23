import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  song: PropTypes.shape({
    album: PropTypes.string,
    duration: PropTypes.number,
    title: PropTypes.string,
    id: PropTypes.number,
    artist: PropTypes.string
  })
};

const defaultProps = {
  song: {
    album: "YEEEEEEET",
    duration: 999,
    title: "Sandstorm Sandstorm ",
    id: 999,
    artist: "Darude"
  }
};

const PlaylistItem = ({ song }) => {
  return (
    <section className="PlaylistItem d-flex flex-row">
      <section className="PlaylistItem-desc d-flex flex-column flex-grow-1">
        <h4>{song.title}</h4>
        <h5>{song.artist}</h5>
        <h5>{song.album}</h5>
      </section>
      <section className="d-flex">
        <button>W</button>
      </section>
    </section>
  );
};

PlaylistItem.propTypes = propTypes;
PlaylistItem.defaultProps = defaultProps;

export default PlaylistItem;
