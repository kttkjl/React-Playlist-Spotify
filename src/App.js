import React, { useState, useEffect } from "react";
import Octicon, {
  Play,
  TriangleLeft,
  TriangleRight
} from "@primer/octicons-react";
import "./App.scss";
import PlaylistContainer from "./containers/PlaylistContainer/PlaylistContainer";
import MainDisplayContainer from "./containers/MainDisplayContainer/MainDisplayContainer";
import FullScreenOverlay from "./components/FullScreenOverlay/FullScreenOverlay";
let playlistUtils = require("./api-utils/playlist");
let libraryUtils = require("./api-utils/library");

export const playListContext = React.createContext();

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

  // Testing function passes
  const clearPlaylists = () => {
    setPlayLists([]);
  };

  const savePlaylist = async (playlistId, songs) => {
    // setPlayLists( playlists => ({...playlists, }))
    try {
      let res = await playlistUtils.savePlaylist(playlistId, songs);
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };

  const addSongToPlaylist = (pl, song) => {};

  useEffect(() => {
    // ComponentDidMount
    getPlaylists();
    getLibrary();
    return () => {
      // ComponentWIllUnmount
    };
  }, []);

  return (
    // <>

    <playListContext.Provider
      value={{
        clearPlaylists
      }}
    >
      <FullScreenOverlay />
      <div className="App vh-100">
        <div className="d-flex flex-column align-items-start h-100">
          <section className="d-flex flex-grow-1 vw-100 position-relative overflow-hidden">
            <MainDisplayContainer library={library} />
            <PlaylistContainer playlists={playlists} library={library} />
          </section>
          <section className="Playbar Playbar-container d-flex ">
            <section className="Playbar-display d-flex flex-column text-white text-center align-self-center">
              <p className="m-0">Song Title</p>
              <p className="m-0">
                <small>Artist : Album</small>
              </p>
            </section>
            <section
              className="Playbar-controls d-flex flex-row align-self-center justify-content-center"
              style={{ color: "white" }}
            >
              <Octicon size="medium" icon={TriangleLeft} />
              <Octicon size="medium" icon={Play} />
              <Octicon size="medium" icon={TriangleRight} />
            </section>
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
    </playListContext.Provider>
  );
}

export default App;
