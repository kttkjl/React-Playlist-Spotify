import React from "react";
import PropTypes from "prop-types";
import Octicon, { ThreeBars } from "@primer/octicons-react";
import Dropdown from "../Dropdown/Dropdown";
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
      <section className="PlaylistItem-desc d-flex flex-column flex-grow-1 ">
        <h4>{song.title}</h4>
        <p>{song.artist}</p>
        <p>{song.album}</p>
      </section>
      <section className="PlaylistItem-menu d-flex align-items-center">
        <Dropdown />
      </section>
    </section>
  );
};

PlaylistItem.propTypes = propTypes;
PlaylistItem.defaultProps = defaultProps;

export default PlaylistItem;
