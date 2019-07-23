import React from "react";
import PropTypes from "prop-types";
import $ from "jquery";
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
  // console.log(evt.currentTarget);
  $("#PlaylistContainer-overlay").addClass("active");
  $(evt.currentTarget).addClass("active");
};

const onOverlayClick = evt => {
  console.log(evt.currentTarget);
  $("#PlaylistContainer").removeClass("active");
  $(evt.currentTarget).removeClass("active");
};

const PlaylistContainer = ({ playlists, library }) => {
  return (
    <>
      <section
        onClick={onOverlayClick}
        id="PlaylistContainer-overlay"
        className="PlaylistContainer-overlay"
      />
      <section
        onClick={onContainerClick}
        id="PlaylistContainer"
        className="PlaylistContainer"
      >
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
      </section>
    </>
  );
};

// PlaylistContainer.propTypes = propTypes;
PlaylistContainer.defaultProps = defaultProps;

export default PlaylistContainer;

{
  /* <section className="Playlist">
<section className="Playlist-contents">
  {playlists.map((item, idx) => {
    return <PlaylistItem key={idx} song={item} />;
  })}
</section>
</section> */
}
