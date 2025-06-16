import axios from 'axios';

const RAWG_API_KEY = 'c1e2f14c507846d594ef779ad5058fbd';

const rawgClient = axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: RAWG_API_KEY
  }
});

export default rawgClient;