import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { GameList, GameListProps, ConnectedProps, ConnectedDispatch } from './GameList';
import { fetchAll } from '../../actions/games';
import { showDetails } from '../../actions/details';
import { parseGames, getActiveGameId } from '../../reducers/gamesReducer';
import { GlobalState } from '../../state/GlobalState';
import { config } from '../../globals';

function mapStateToProps(state: GlobalState, props: GameListProps): ConnectedProps {
    return {
    	games: parseGames(state.games),
    	message: state.message,
    	status: state.status,
    	active: state.active
    }
};

function mapDispatchToProps(dispatch: Dispatch<any>): ConnectedDispatch {
    return bindActionCreators({ 
        fetchAll: fetchAll,
        showDetails: showDetails
    }, dispatch);
};

// tslint:disable-next-line:variable-name
export const GameListContainer = connect(mapStateToProps, mapDispatchToProps)(GameList) as React.ComponentClass<GameListProps>;
