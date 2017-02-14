import * as React from 'react';

export interface GameDetailsProps extends React.Props<GameDetails> {
  game: object;
}

export class GameDetails extends React.Component<GameDetailsProps, void> {

    componentDidMount(){
      $("#fake-browser").draggable();
    }
    
    render() {

      let logoStyle = {
        backgroundImage: "url(" + this.props.game['Icon'] + ")"
      }
      
      return (
        <section id="fake-browser">
          <div className="respawn" id="respawn">Click/tap to reopen browser</div>
            <div className="browser" id="browser">
              <div className="window-title">
                <div className="window-icon"></div>
                <div className="title-text">{this.props.game['Slug']}</div>
                <div className="space1"></div>
              </div>
              <ul className="menu">
                <li><span>F</span>ile
                </li>
                <li><span>E</span>dit
                </li>
                <li><span>O</span>ptions
                </li>
                <li><span>N</span>avigate
                </li>
                <li><span>H</span>otlist
                </li>
                <li><span>A</span>nnotate
                </li>
                <li className="space2"></li>
                <li><span>H</span>elp
                </li>
              </ul>
              <div className="btns">
                <button>
                  <div className="sprite open_icon"></div>
                </button>
                <button disabled="">
                  <div className="sprite save_icon"></div>
                </button>
                <button id="back" disabled="">
                  <div className="sprite back_icon"></div>
                </button>
                <button id="forward" disabled="">
                  <div className="sprite fwd_icon"></div>
                </button>
                <button id="refresh">
                  <div className="sprite refresh_icon"></div>
                </button>
                <button disabled="">
                  <div className="sprite home_icon"></div>
                </button>
                <button disabled="">
                  <div className="sprite copy_icon"></div>
                </button>
                <button disabled="">
                  <div className="sprite paste_icon"></div>
                </button>
                <button>
                  <div className="sprite paper_icon"></div>
                </button>
                <button id="print">
                  <div className="sprite print_icon"></div>
                </button>
                <button>
                  <div className="sprite help_icon"></div>
                </button>
              </div>
              <hr/>
              <div className="navigation">
                <form>
                  <label>Document Title:</label>
                  <input type="text" id="doc_title" disabled="" value={this.props.game['Name']}/>
                  <label>Identification:</label>
                  <input type="text" id="doc_url" value={this.props.game['ID']}/>
                </form>
                <div className="logo" style={logoStyle}"></div>
              </div>
              <hr/>
              <iframe id="doc" src=""></iframe>
              <hr/>
              <div className="window-bottom">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </section> 
      );

    }
}