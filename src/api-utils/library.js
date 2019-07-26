let domain = process.env.REACT_APP_DOMAIN || "localhost";
let port = process.env.REACT_APP_PORT || 5000;

const getLibrary = async function() {
  const response = await fetch(`${domain}:${port}/library`);
  const json = await response.json();
  return json;
};

export { getLibrary };
