import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as TestUtils from 'react-addons-test-utils'
import * as renderer from 'react-test-renderer'

import { GlobalStateGetter } from '../state/GlobalState'
import 'whatwg-fetch'
import { 
    FetchGamesStarted, FetchGamesSucceeded, FetchGamesFailed,
    FETCH_GAMES_STARTED, FETCH_GAMES_SUCCEEDED, FETCH_GAMES_FAILED
} from '../actions/games'

import GameLoader from '../components/games/GameLoader'

import tree from './utils/tree'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureStore([thunk])

describe('Curse Game Testing', () => {

  describe('Fetching Game Data', () => {

      type testEndPoint: String
      const testEndPoint = "https://clientupdate-v6.cursecdn.com/Feed/games/v10/games.json"
      
      function fetchGamesSucceeded(data): FetchGamesSucceeded { 
              return { type: FETCH_GAMES_SUCCEEDED, items: data }
          }

      function fetchGames(endpoint) {
            return dispatch => {
                return fetch(endpoint)
                  .then(response => response.json())
                      .then(json => dispatch(fetchGamesSucceeded(json.data)))
                      .catch(error => dispatch(false);
              };
          }

      pit('downloads data from Curse CDN successfully', () => {     

        const store = mockStore({games:[]})

        return store.dispatch(fetchGames(testEndPoint))
            .then(() => {
              const actions = store.getActions()
              expect(actions[0]).toBeTruthy();
            })
    	});
    	
      it('displays an indication of progress', () => {
        
        const progress = TestUtils.renderIntoDocument(<GameLoader message="" />);

        const progressNode = ReactDOM.findDOMNode(progress);

      	expect(progressNode).toBeTruthy();
    	});
  })
 
});