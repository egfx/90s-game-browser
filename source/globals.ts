import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { Config } from './models/Config';
import { GlobalState } from './state/GlobalState';
import { gamesReducer } from './reducers/gamesReducer';

export let store: Redux.Store<GlobalState>;
export let config: Config;

export function initGlobals() {
    config = new Config();
    store = createStore<GlobalState>(
        combineReducers<GlobalState>({
            games: gamesReducer
        }),
        applyMiddleware(thunk)
    );
}
