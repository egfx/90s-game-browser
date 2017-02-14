import { GlobalStateGetter } from '../state/GlobalState';

// Get Game Details

export type GET_GAME_DETAILS = 'GET_GAME_DETAILS';
export const GET_GAME_DETAILS: GET_GAME_DETAILS = 'GET_GAME_DETAILS';
export type GetGameDetails = {
    type: GET_GAME_DETAILS;
};

function getGameDetails(data): GetGameDetails { 
    return { type: GET_GAME_DETAILS, item: data };
} 

export function showDetails(payload){
    return (dispatch: Redux.Dispatch<any>, getState: GlobalStateGetter) => { 
      dispatch(getGameDetails(payload));
    }
}
