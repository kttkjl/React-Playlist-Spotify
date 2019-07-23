import React from "react";
import PropTypes from "prop-types";
import $ from "jquery";
import Octicon, { X } from "@primer/octicons-react";
import PlaylistItem from "../../components/PlaylistItem/PlaylistItem";

// const propTypes = {
//   song: PropTypes.shape({
//     album: PropTypes.string,
//     duration: PropTypes.number,
//     title: PropTypes.string,
//     id: PropTypes.number,
//     artist: PropTypes.string
//   })
// };

const defaultProps = {
  playlists: [
    {
      id: -1,
      name: "",
      songs: []
    }
  ],
  library: {
    "-1": {
      album: "",
      duration: -1,
      title: "",
      id: -1,
      artist: ""
    }
  }
};

const onPlaylistClick = evt => {
  // console.log(evt.target.parentNode);
  evt.stopPropagation();
  evt.target.parentNode.querySelector("section").classList.toggle("closed");
};

const onContainerClick = evt => {
  $("#PlaylistContainer-overlay").addClass("active");
  $(evt.currentTarget).addClass("active");
};

const onClose = evt => {
  evt.stopPropagation();
  $("#PlaylistContainer").removeClass("active");
  $("#PlaylistContainer-overlay").removeClass("active");
};

const PlaylistContainer = ({ playlists, library }) => {
  return (
    <>
      <section
        onClick={onClose}
        id="PlaylistContainer-overlay"
        className="PlaylistContainer-overlay"
      />
      <section
        onClick={onContainerClick}
        id="PlaylistContainer"
        className="PlaylistContainer"
      >
        <section className="PlaylistContainer-wrapper">
          <h1>PLAYLISTS</h1>
          {playlists ? (
            playlists.map((list, idx) => {
              return (
                <section key={idx} className="PlaylistContainer-contents">
                  <h3 onClick={onPlaylistClick}>{`[${list.id}] : ${
                    list.name
                  }`}</h3>
                  <section className="collapseable closed">
                    {list.songs && list.songs.length > 0 ? (
                      list.songs.map((song_id, idx2) => {
                        return (
                          <PlaylistItem
                            song={library[song_id]}
                            key={idx2}
                            plId={list.id}
                          />
                        );
                      })
                    ) : (
                      <span>Add songs</span>
                    )}
                  </section>
                </section>
              );
            })
          ) : (
            <span />
          )}
          <section onClick={onClose} className="PlaylistContainer-controls ">
            <Octicon icon={X} size="medium" />
          </section>
        </section>
      </section>
    </>
  );
};

// PlaylistContainer.propTypes = propTypes;
PlaylistContainer.defaultProps = defaultProps;

export default PlaylistContainer;
