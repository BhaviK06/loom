const API_KEY = "AIzaSyDiMkln80jiC2Djm0dAE1HiU8GVuSydhp0";

export async function searchBooks(query) {
  try {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${API_KEY}`
    );
    const data = await res.json();
    return data.items || [];
  } catch (err) {
    console.error(err);
    return [];
  }
}
