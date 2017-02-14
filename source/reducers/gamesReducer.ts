import { GamesState } from "../state/GamesState";
import { 
    FetchGamesStarted, FetchGamesSucceeded, FetchGamesFailed,
    FETCH_GAMES_STARTED, FETCH_GAMES_SUCCEEDED, FETCH_GAMES_FAILED
} from "../actions/games";
import { GetGameDetails, GET_GAME_DETAILS } from "../actions/details";
import { sortBy } from "lodash";
import { config } from "../globals";

type Actions = FetchGamesStarted | FetchGamesSucceeded | FetchGamesFailed;

const initialState: GamesState = {
    games: [],
    message: '',
    status: 'init',
    active: {}
};

export function gamesReducer(state: GamesState = initialState, action: Actions) {
    switch (action.type) {
        case FETCH_GAMES_STARTED:
            return {
                games: state.games,
                message: config.fetchStartingMsg,
                status: 'working' // 202
            }
            break;
        case FETCH_GAMES_FAILED:
            return {
                games: state.games,
                message: config.fetchErrorMsg,
                status: 'failed' // 400
            }
            break;
        case FETCH_GAMES_SUCCEEDED:
            return {
                games: state.games.concat(action.items),
                message: config.fetchSuccessMsg,
                status: 'done' // 200
            }
            break;
        case GET_GAME_DETAILS:
            return {
                games: state.games,
                message: config.fetchDetailsMsg({fileID: action.item['Name']}),
                status: 'details',
                active: action.item
            }
    }

    return state;
}

export function addKeys(games: Array) {
    games.forEach((game) => {
        let tmpl = {
            Icon: config.gameIconURLTemplate({gameID: game['ID']})
        };
        Object.assign(game, tmpl);
    });

    return games;
}

export function sortKeys(objectIds: Array, key: String) {
    return sortBy(objectIds, key);
}

export function filterKeys(data: Object, keysToFilter: Array) {

  keysToFilter.forEach((key, index, array) => {
       array[index] = key.toLowerCase();
  });

  return data.map((item) => {
    return Object.keys(item).reduce(function(result, key) {
      let tempKey = key.toLowerCase();
      if (keysToFilter.indexOf(tempKey) !== -1) result[key] = item[key];
      return result;
    }, {});
  });
}

export function remapKeys(games: Object) {

    return addKeys(sortKeys(filterKeys(games, config.gameKeys), 'Order'));
}

export function parseGames(state: GamesState) {
    if(state.status === 'done'){
        Object.assign(state.games, remapKeys(state.games));
    }

    return state;
}
