import * as React from 'react';

import { config } from '../../globals';

import { GameLoader } from './GameLoader';
import { GameDetails } from './GameDetails';

export interface GameListProps extends React.Props<GameList> {
    // Define any props taken by List itself.
}

export interface ConnectedProps {
    // Define any connected props here. (The ones mapped by ListContainer.)
    games: array;
    message: string;
    status: string;
    active: object;
}

export interface ConnectedDispatch {
    // Define any connected dispatch actions here. (The ones mapped by ListContainer.)
    fetchAll: function;
    showDetails: function;
}

type CombinedTypes = GameListProps & ConnectedProps & ConnectedDispatch;

export class GameList extends React.Component<CombinedTypes, void> {

    _fetchGames() {
        this.props.fetchAll(config.gamesDataURL);
    }

    _showDetails(idx) {
      this.props.showDetails(this.props.games.games[idx]);
    }

    render() {
        if(this.props.games.status === 'done' || this.props.games.status === 'details'){

            let boxes = this.props.games.games.map((game, index) {
              return (
                <div key={game['ID']} className='portrait' onClick={this._showDetails.bind(this, index)}>
                      <img src={game.Icon} />
                      <div className='feature-container'>
                         <div className='feature'> addons: {game.SupportsAddons ? 'yes' : 'no'}</div>
                         <div className='feature'> voice: {game.SupportsVoice ? 'yes' : 'no'}</div>
                      </div>
                     <p>{game.Slug}</p>
                </div>
              );
            }, this);

            let dom = (<div className='GameList--display'> 
                 <h1>Games</H1>
                 <div>
                   <div className='row'>
                    <div className='col' id="GameDisplay--nodelist">
                       {boxes}
                    </div>
                   </div>
                   <br/>
                 </div>
              </div>);

        } else if(this.props.games.status === 'working') {

            let dom = (<GameLoader message={this.props.games.message} />);

        } else if(this.props.games.status === 'init'){
            
            let dom = (<div className='GameList--root'>
                    <img src="/assets/images/flame.png" />
                    <h1>Curse React Test</h1>
                    <p>This is the GameList component, located in <code>components/games/GameList.tsx</code>. Start your implementation here.</p>
                    <p>{this.props.games.message}</p>
                    <div className='GameList--start'>
                        <div className='start'>
                            <div className='start__button'>
                              <span className='start__text' onClick={this._fetchGames.bind(this)}>Start</span>
                            </div>
                        </div>
                    </div>
                </div>);
        
        }

        return (<div>{dom}{
          this.props.games.status === 'details'
            ? <GameDetails game={this.props.games.active} />
            : null
        }</div>);
    }
} 

// for Jest testing..
export default GameList;