import axios from "./axios";
import rawgClient from "./rawgClient";

export const getUserGames = () => axios.get('/usergames');
export const getUserGame = async (gameId) =>{
  const res = await axios.get(`/usergames/${gameId}`);
  return res.data;
} 
export const postUserGame = (game) => axios.post(`/usergames`, game);
export const putUserGame = async (gameId, payload) => {
  const res = await axios.put(`/usergames/${gameId}`,payload);
  return res.data; 
}
export const deleteUserGame = (gameId) => axios.delete(`/usergames/${gameId}`);


export const updateAvatar = (avatar) => axios.post('/avatar',{avatar: avatar}, {withCredentials: true});

export const fetchGames = async () => {
  const res = await rawgClient.get('/games');
  return res.data.results;
}
export const fetchGamesParam = async (params) => {
  const res = await rawgClient.get('/games',{
    params
  });
  return res.data;
}
export const searchGames = async (query) => {
  const res = await rawgClient.get('/games', {
    params: { search: query }
  });
  return res.data.results;
};
export const getGameDetails = async (id) => {
  const res = await rawgClient.get(`/games/${id}`);
  return res.data;
};
export const getGameScreenshots = async (id) => {
  const res = await rawgClient.get(`/games/${id}/screenshots`);
  return res.data;
};

export const getGenresRequest = async () => {
  const res = await rawgClient.get('/genres');
  return res.data.results;
}

export const getPlatformsRequest = async () => {
  const res = await rawgClient.get('/platforms');
  return res.data.results;
}

export const getPublishersRequest = async () =>{
  const res = await rawgClient.get('/publishers',{
    params: {page_size: 84481}
  });
  return res.data; 
}

export const getDevelopersRequest = async () =>{
  const res = await rawgClient.get('/developers',{
    params: {page_size: 457660}
  });
  return res.data; 
}

export const genreOptions = [
  'Acción', 'Aventura', 'RPG', 'Estrategia', 'Simulación', 'Deportes', 'Puzzle'
];

export const platformOptions = [
  'PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Mobile', 'Mac'
];