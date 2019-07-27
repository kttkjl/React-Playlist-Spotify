import React, { useState, useContext, useEffect } from "react";
import Dropdown from "../Dropdown/Dropdown";
import FullScreenOverlay from "../FullScreenOverlay/FullScreenOverlay";
import { playListContext } from "../../App";

const AddToPLModal = ({ song, confirmCallback, cancelCallback }) => {
  const playListContainerstyle = {
    maxHeight: "50vh",
    maxWidth: "80vw",
    overflowY: "scroll",
    overflowX: "scroll"
  };
  const plContext = useContext(playListContext);
  const [selectedPlaylist, selectPlaylist] = useState(plContext.playlists[0]);

  const onConfirmClick = () => {
    let updatedPl = {
      ...selectedPlaylist,
      songs: [...selectedPlaylist.songs, song.id]
    };
    // console.log(JSON.stringify(updatedPl));
    plContext.savePlaylist(updatedPl, null);
    confirmCallback();
  };

  return (
    <FullScreenOverlay>
      <section className="AddToPlModal-content d-flex flex-column ">
        <h4>Select playlist</h4>
        <div style={playListContainerstyle}>
          <div>
            {plContext &&
              plContext.playlists &&
              plContext.playlists.map(playlist => {
                return (
                  <div
                    style={{
                      backgroundColor:
                        selectedPlaylist.id === playlist.id && "rgba(0,0,0,0.2)"
                    }}
                    key={playlist.id}
                    className="noselect"
                    onClick={() => {
                      selectPlaylist(playlist);
                    }}
                  >
                    <h5 className="m-0 p-1">{playlist.name}</h5>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="d-flex flex-row">
          <button className="w-50 noselect" onClick={onConfirmClick}>
            Confirm
          </button>
          <button className="w-50 noselect" onClick={cancelCallback}>
            Cancel
          </button>
        </div>
      </section>
    </FullScreenOverlay>
  );
};

const BrowseCard = ({ song }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [marquee, setMarquee] = useState(false);
  const [albumArt, setAlbumArt] = useState("");
  // const [currentSongId, setCurrentSongId] = useState(-1);
  let dropdownItems = [
    {
      menuAction: () => {
        setModalOpen(true);
      },
      menuTag: "Add to Playlist"
    }
  ];

  const onModalCancel = () => {
    setModalOpen(false);
  };

  const onModalConfirm = () => {
    setModalOpen(false);
  };

  const determineMarquee = evt => {
    evt.stopPropagation();
    let actual = evt.currentTarget.scrollWidth - 1; //-1 for browser shenanigans
    let container = parseInt(window.getComputedStyle(evt.currentTarget).width);
    if (actual > container) {
      setMarquee(true);
    }
  };

  const getAlbumArt = async () => {
    let item = `albArt.${song.artist}.${song.album}`;
    let local = localStorage.getItem(item);
    if (!local) {
      let url = `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=1ed82a7324057feecb1eebd5af5dbb80&artist=${
        song.artist
      }&album=${song.album}&format=json`;
      let res = await fetch(url);
      let json = await res.json();
      let imageUrl;
      if (json.error || !json.album.image[2]["#text"]) {
        imageUrl = "https://i.imgur.com/nvK2vj3.png";
      } else {
        imageUrl = json.album.image[2]["#text"];
      }
      localStorage.setItem(item, imageUrl);
      setAlbumArt(imageUrl);
    } else {
      // Have it, load it
      setAlbumArt(local);
    }
  };

  useEffect(() => {
    getAlbumArt();
    return () => {};
  }, []);

  return (
    <div className="BrowseCard card text-white bg-dark">
      <img
        className="card-img-top"
        src={albumArt ? albumArt : "https://i.imgur.com/nvK2vj3.png"}
        alt="Card cap"
      />
      <div className="card-body">
        <h5 className={`card-title`}>
          <div
            onPointerLeave={() => setMarquee(false)}
            onPointerOver={determineMarquee}
            className={`${marquee ? "marquee" : "ellipsis"}`}
          >
            {song.title}
          </div>
        </h5>
        <p className="card-text ellipsis"> {song.artist}</p>
        <p className="card-text ">
          <small className="text-white ellipsis">{song.album}</small>
        </p>
      </div>
      <div className="d-flex justify-content-end">
        <Dropdown menuItems={dropdownItems} />
      </div>
      {modalOpen && (
        <AddToPLModal
          song={song}
          cancelCallback={onModalCancel}
          confirmCallback={onModalConfirm}
        />
      )}
    </div>
  );
};

export default BrowseCard;
