import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import $ from "jquery";
import Octicon, { X, Trashcan, Plus } from "@primer/octicons-react";
import PlaylistItem from "../../components/PlaylistItem/PlaylistItem";
import Dropdown from "../../components/Dropdown/Dropdown";
import FullScreenOverlay from "../../components/FullScreenOverlay/FullScreenOverlay";

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

const RenameModal = ({ playlist, confirmCallback, cancelCallback }) => {
  const newNameRef = useRef();

  const onConfirmClick = () => {
    // console.log(newNameRef.current.value);
    // Existing playlist or new playlist
    playlist
      ? confirmCallback(newNameRef.current.value, playlist)
      : confirmCallback(newNameRef.current.value);
  };

  return (
    <FullScreenOverlay>
      <section className="d-flex flex-column">
        {/* <p>Renaming {playlist.name}</p> */}
        <input
          className="mb-1 "
          ref={newNameRef}
          placeholder={playlist ? playlist.name : "new playlist"}
        />
        <section className="d-flex flex-row">
          <button className="w-50 noselect" onClick={onConfirmClick}>
            Confirm
          </button>
          <button className="w-50 noselect" onClick={cancelCallback}>
            Cancel
          </button>
        </section>
      </section>
    </FullScreenOverlay>
  );
};

const PlaylistContainer = ({ playlists, library }) => {
  let [modalOpen, setModalOpen] = useState(false);
  let [focusPlaylistId, setFocusPlaylistId] = useState(-1);
  let [isNewPlaylist, setIsNewPlaylist] = useState(false);

  const onRenameConfirm = async (name, playlist) => {
    console.log("yes ", name, " : ", playlist.id);
    setModalOpen(false);
  };

  const onRenameCancel = id => {
    console.log("no ", id);
    setModalOpen(false);
  };

  const onNewPlConfirm = name => {
    console.log("new playlist ", name);
    setIsNewPlaylist(false);
  };

  const onNewPlCancel = () => {
    setIsNewPlaylist(false);
  };

  const onAddPlaylist = evt => {
    evt.stopPropagation();
    setModalOpen(true);
    setIsNewPlaylist(true);
    console.log("Add PL called");
  };

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
                  {modalOpen && list.id === focusPlaylistId && (
                    <RenameModal
                      playlist={list}
                      confirmCallback={onRenameConfirm}
                      cancelCallback={onRenameCancel}
                    />
                  )}
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
                              setFocusPlaylistId(list.id);
                              setModalOpen(true);
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
          {modalOpen && isNewPlaylist && (
            <RenameModal
              confirmCallback={onNewPlConfirm}
              cancelCallback={onNewPlCancel}
            />
          )}
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
