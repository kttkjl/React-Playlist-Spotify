import React, { useState, useEffect } from "react";
import Octicon, {
  Play,
  TriangleLeft,
  TriangleRight
} from "@primer/octicons-react";
import "./App.scss";
import PlaylistContainer from "./containers/PlaylistContainer/PlaylistContainer";
import MainDisplayContainer from "./containers/MainDisplayContainer/MainDisplayContainer";
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

  // API call to delete a playlist
  const deletePlaylist = async playlistId => {
    try {
      let res = await playlistUtils.deletePlaylist(playlistId);
      console.log(res, res.status);
      if (res.status === 200) {
        let newPls = playlists.filter(pl => pl.id !== playlistId);
        setPlayLists(newPls);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // API call to save playlist, existing or new
  const savePlaylist = async (playlist, newPlayListName) => {
    // setPlayLists( playlists => ({...playlists, }))
    try {
      console.log(`savePlaylist hit: ${playlist}, ${newPlayListName}`);
      let res = await playlistUtils.savePlaylist(playlist, newPlayListName);
      console.log(res);

      // Update the App state
      if (!playlist) {
        // new playlist
        let updatedPl = {
          name: newPlayListName,
          songs: [],
          id: res.id
        };
        updateNewPlaylist(updatedPl);
      } else {
        // update old playlist
        let updatedPl = {
          name: newPlayListName ? newPlayListName : playlist.name,
          songs: playlist.songs, // Expecting new songs to be massaged in
          id: res.id
        };
        updateExistingPlaylist(res.id, updatedPl);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Update the Application state for a new playlist
  const updateNewPlaylist = playlist => {
    let newPls = [...playlists];
    newPls.push(playlist);
    // console.log("new playlist", newPls);
    setPlayLists(newPls);
  };

  // Update the Application state for existing playlist
  const updateExistingPlaylist = (playlistId, playlist) => {
    let updated = [...playlists];
    let idx = updated.findIndex(playlist => playlist.id === playlistId);
    updated[idx] = playlist;
    // console.log("updated playlist", updated);
    setPlayLists(updated);
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
    // <>
    <playListContext.Provider
      value={{
        clearPlaylists,
        deletePlaylist,
        savePlaylist,
        playlists
      }}
    >
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
