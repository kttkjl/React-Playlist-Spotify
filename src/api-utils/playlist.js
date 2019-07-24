const getAllPlaylists = async function() {
  const response = await fetch("http://localhost:5000/playlist");
  const json = await response.json();
  return json;
};

const savePlaylist = async (playlist, newPlayListName, songs) => {
  let url = `http://localhost:5000/playlist/${playlist.id ? playlist.id : ""}`;
  let options = {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      name: newPlayListName ? newPlayListName : playlist.name,
      songs: songs
    })
  };

  const response = await fetch(url, options);
  const json = await response.json();
  return json;
};

export { getAllPlaylists, savePlaylist };
