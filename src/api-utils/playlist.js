const getAllPlaylists = async function() {
  const response = await fetch(`${process.env.PUBLIC_URL}/playlist`);
  const json = await response.json();
  return json;
};

/**
 * Calls the API to Update/Create a playlist
 * If a playlist object is not passed in
 *    Then this is a new playlist request
 * Else
 *    Update the existing playlist with playlist object
 * @param {new/updated playlist object for existing playlist} playlist
 * @param {updated playlistname for existing or new playlist} newPlayListName
 */
const savePlaylist = async (playlist, newPlayListName) => {
  let url = `${process.env.PUBLIC_URL}/playlist${playlist ? `/${playlist.id}` : ""}`;
  console.log(`url :  ${url} `);
  let options = {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      name: newPlayListName ? newPlayListName : playlist.name,
      songs: playlist ? playlist.songs : []
    })
  };

  const response = await fetch(url, options);
  const json = await response.json();
  return json;
};

const deletePlaylist = async playlistId => {
  let url = `${process.env.PUBLIC_URL}/playlist/${playlistId}`;
  let options = {
    method: "DELETE"
  };
  const response = await fetch(url, options);
  return response;
};

export { getAllPlaylists, savePlaylist, deletePlaylist };
