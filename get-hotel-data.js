let cachedHoteData;

export default async function() {
  if (!cachedHoteData) {
    let response = await fetch("https://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/en");
    cachedHoteData = response.json();
  }
  return cachedHoteData;
}
