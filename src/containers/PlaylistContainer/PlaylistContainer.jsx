import React from "react";
import PropTypes from "prop-types";
import $ from "jquery";
import Octicon, { X, Trashcan, Plus } from "@primer/octicons-react";
import PlaylistItem from "../../components/PlaylistItem/PlaylistItem";
import Dropdown from "../../components/Dropdown/Dropdown";

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
  // console.log(evt.target.parentNode.querySelector("section").classList);
  evt.stopPropagation();
  evt.target.parentNode
    .querySelector(".collapseable")
    .classList.toggle("closed");
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

const onDeletepl = evt => {
  evt.stopPropagation();
  console.log("delete pressed");
};

const onAddPlaylist = evt => {
  evt.stopPropagation();
  console.log("Add PL called");
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
          <h1 className="noselect">PLAYLISTS</h1>
          {playlists ? (
            playlists.map((list, idx) => {
              return (
                <section key={idx} className="PlaylistContainer-contents">
                  <h3
                    className="d-flex align-items-center justify-content-between noselect"
                    onClick={onPlaylistClick}
                  >
                    {`[${list.id}] : ${list.name}`}
                    <span>
                      <Dropdown
                        menuItems={[
                          {
                            menuTag: "Rename",
                            menuAction: () => {
                              console.log(`renamin ${list.name}`);
                            }
                          },
                          {
                            menuTag: "Delete",
                            menuAction: () => {
                              console.log(`deletin ${list.name}`);
                            }
                          }
                        ]}
                      />
                    </span>
                  </h3>
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
                      <span>[Empty playlist]</span>
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
          <section
            onClick={onAddPlaylist}
            className="d-flex justify-content-center align-items-center noselect"
          >
            <p className="mb-0 mr-2">Add Playlist </p>
            <Octicon icon={Plus} size="small" />
          </section>
        </section>
      </section>
    </>
  );
};

// PlaylistContainer.propTypes = propTypes;
PlaylistContainer.defaultProps = defaultProps;

export default PlaylistContainer;
