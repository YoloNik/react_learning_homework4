const API_BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27731761-2d24267d92059d0b1c4703b1a';

const getData = async (path, page) => {
  const res = await fetch(
    `${API_BASE_URL}?key=${API_KEY}&q=${
      path ? path : ''
    }&orientation=horizontal&page=${page}&per_page=20`,
  );
  return res.ok ? res.json() : Promise.reject(new Error(res.statusText));
};

export { getData };
