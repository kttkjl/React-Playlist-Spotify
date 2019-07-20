const getAllPlaylists = async function() {
  const response = await fetch("http://localhost:5000/playlist");
  const json = await response.json();
  return json;
};

export { getAllPlaylists };
