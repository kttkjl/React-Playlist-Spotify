import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

let playlistUtils = require("./api-utils/playlist");

function App() {
  const [playlists, setPlayLists] = useState([]);

  const getPlaylists = async () => {
    let res = await playlistUtils.getAllPlaylists();
    setPlayLists(res);
  };

  useEffect(() => {
    // ComponentDidMount
    getPlaylists();
    return () => {
      // ComponentWIllUnmount
    };
  }, []);

  return (
    <div className="App">
      {playlists.map((playlist, idx) => {
        return <div key={playlist.id}>{playlist.name}</div>;
      })}
    </div>
  );
}

export default App;
