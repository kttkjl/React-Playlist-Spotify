const getLibrary = async function() {
  const response = await fetch("http://localhost:5000/library");
  const json = await response.json();
  return json;
};

export { getLibrary };
