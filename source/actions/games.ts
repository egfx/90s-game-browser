import { GlobalStateGetter } from "../state/GlobalState";
import { xmlToJson as toJson } from '../utilities';

// Fetch Games Started
export type FETCH_GAMES_STARTED = 'FETCH_GAMES_STARTED';
export const FETCH_GAMES_STARTED: FETCH_GAMES_STARTED = 'FETCH_GAMES_STARTED';
export type FetchGamesStarted = {
    type: FETCH_GAMES_STARTED;
};

function fetchGamesStarted(): FetchGamesStarted { 
    return { type: FETCH_GAMES_STARTED };
}

// Fetch Games Succeeded
export type FETCH_GAMES_SUCCEEDED = 'FETCH_GAMES_SUCCEEDED';
export const FETCH_GAMES_SUCCEEDED: FETCH_GAMES_SUCCEEDED = 'FETCH_GAMES_SUCCEEDED';
export type FetchGamesSucceeded = {
    type: FETCH_GAMES_SUCCEEDED;
};

function fetchGamesSucceeded(data): FetchGamesSucceeded { 
    return { type: FETCH_GAMES_SUCCEEDED, items: data };
}

// Fetch Games Failed
export type FETCH_GAMES_FAILED = 'FETCH_GAMES_FAILED';
export const FETCH_GAMES_FAILED: FETCH_GAMES_FAILED = 'FETCH_GAMES_FAILED';
export type FetchGamesFailed = {
    type: FETCH_GAMES_FAILED;
};

function fetchGamesFailed(data): FetchGamesFailed { 
    return { type: FETCH_GAMES_FAILED, items: data };
}   

// Fetch Games Thunk
export function fetchGames(endpoint) {
    return (dispatch: Redux.Dispatch<any>, getState: GlobalStateGetter) => {

        // Implement remainder of thunk

        fetch(endpoint)
          .then(response => response.json())
              .then(json => dispatch(fetchGamesSucceeded(json.data)))
              .catch(error => dispatch(fetchGamesFailed(error)));

    };
}

export function fetchArt(endpoint) {
    return (dispatch: Redux.Dispatch<any>, getState: GlobalStateGetter) => {

        /* TODO: implement middleware to do the transforms */
        
        // XML parsing solution for whatwg-fetch...
        fetch(endpoint, {mode: 'no-cors'}).then(function (res) {
            res.arrayBuffer().then(function (buffer) {
                var parser = new DOMParser();
                console.log(parser);
                var view = new Uint8Array(buffer);
                let buffer = parser.parseFromBuffer(view, view.length, 'text/xml');
                console.log(toJson(buffer));
            });
        }).catch(error => dispatch(fetchGamesFailed(error)));

    };
}

export function fetchAll(endpoint) {
  return (dispatch: Redux.Dispatch<any>, getState: GlobalStateGetter) => { 
      Promise.all([
        dispatch(fetchGamesStarted())
        dispatch(fetchGames(endpoint))
        //dispatch(fetchArt(config.api.list.url({nameID: "diablo-2"}))); TODO: implement remainder of API for fullscreen background
      ]);
    }
}
