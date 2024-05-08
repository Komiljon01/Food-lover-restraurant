async function getResources() {
  const response = await fetch("http://localhost:3000/offers");
  return await response.json();
}

export default getResources;
