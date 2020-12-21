
const getLibrary = async function() {
  const response = await fetch(`${process.env.PUBLIC_URL}/library`);
  const json = await response.json();
  return json;
};

export { getLibrary };
