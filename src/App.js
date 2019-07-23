import React, { useState, useEffect } from "react";
import "./App.scss";
import PlaylistContainer from "./containers/PlaylistContainer/PlaylistContainer";
import MainDisplayContainer from "./containers/MainDisplayContainer/MainDisplayContainer";
let playlistUtils = require("./api-utils/playlist");
let libraryUtils = require("./api-utils/library");

// const AddToPlaylistContext = React.createContext();

function App() {
  const [playlists, setPlayLists] = useState([{}]);
  const [library, setLibrary] = useState({});

  const getPlaylists = async () => {
    let res = await playlistUtils.getAllPlaylists();
    setPlayLists(res);
  };

  const getLibrary = async () => {
    // Possible check here for localstorage ... to save bandwidth
    let res = await libraryUtils.getLibrary();
    // Massage array into map, for quicker access
    let lib = new Map();
    res.forEach(item => {
      lib[item.id] = item;
    });
    // console.log(lib);
    setLibrary(lib);
  };

  useEffect(() => {
    // ComponentDidMount
    getPlaylists();
    getLibrary();
    return () => {
      // ComponentWIllUnmount
    };
  }, []);

  return (
    <div className="App vh-100">
      {/* {playlists.map((playlist, idx) => {
        return <div key={playlist.id}>{playlist.name}</div>;
      })} */}
      <div className="d-flex flex-column align-items-start h-100">
        <section className="d-flex flex-grow-1 vw-100 position-relative overflow-hidden">
          <MainDisplayContainer library={library} />
          <PlaylistContainer playlists={playlists} library={library} />
        </section>
        <section style={{ color: "white" }} className="Playbar">
          THIS BE PLAY BAR
        </section>
        <section className="PlaylistLibraryToggle d-flex flex-row">
          <button className="d-flex flex-grow-1">
            <span>Playlist</span>
          </button>
          <button className="d-flex flex-grow-1">
            <span>Library</span>
          </button>
        </section>
      </div>
    </div>
  );
}

export default App;
