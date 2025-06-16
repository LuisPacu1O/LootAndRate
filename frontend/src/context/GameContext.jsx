import { createContext, useContext, useState } from "react";
import { fetchGames, fetchGamesParam, getDevelopersRequest, getGenresRequest, getPlatformsRequest, getPublishersRequest } from "../api/gameOptions";

const GameContext = createContext();

export const useGame = () => {
    const context = useContext(GameContext);
    if(!context) {
        throw new Error("useGame debe usarse junto con GameProvider");
    }
    return context; 
}

export function GameProvider({children}){
    const [games, setGames] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [genres, setGenres] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [developers, setDevelopers] = useState([]);
    const [count, setCount] = useState(0);
    
    const getGames = async () => {
        const resApi = await fetchGames();
        const games = resApi;
        setCount(resApi.count)
        setGames(games)
    }

    const getGameParams = async (params) => {
        const resApi = await fetchGamesParam(params);
        setCount(resApi.count)
        setGames(resApi.results)
    }

    const getGenres = async () => {
        try {
            const res = await getGenresRequest();
            setGenres(res);
        } catch (error) {
            console.log(error)
        }
    }

    const getPlatforms = async () => {
        try {
            const res = await getPlatformsRequest();
            setPlatforms(res)
        } catch (error) {
            console.log(error)
        }
    }

    const getPublishers = async () => {
        try {
            const res = await getPublishersRequest();
            setPublishers(res.results)
        } catch (error) {
            console.log(error)
        }
    }

    const getDevelopers = async () => {
        try {
            const res = await getDevelopersRequest();
            setDevelopers(res.results)
        } catch (error) {
            console.log(error)
        }
    }    

    return(
        <GameContext.Provider 
        value={{
            games,
            setGames,
            getGames,
            getGameParams,
            genres,
            platforms,
            publishers,
            developers,
            getGenres,
            getPlatforms,
            getPublishers,
            getDevelopers,
            count
        }}>
            {children}
        </GameContext.Provider>
    );
}