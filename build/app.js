webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(1);
	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(33);
	var globals_1 = __webpack_require__(179);
	globals_1.initGlobals();
	var Root_1 = __webpack_require__(208);
	ReactDOM.render(React.createElement(Root_1.Root, null), document.getElementById('app'));
	console.info('Initialized ventura.');


/***/ },

/***/ 179:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var redux_1 = __webpack_require__(180);
	var redux_thunk_1 = __webpack_require__(201);
	var Config_1 = __webpack_require__(202);
	var gamesReducer_1 = __webpack_require__(204);
	function initGlobals() {
	    exports.config = new Config_1.Config();
	    exports.store = redux_1.createStore(redux_1.combineReducers({
	        games: gamesReducer_1.gamesReducer
	    }), redux_1.applyMiddleware(redux_thunk_1.default));
	}
	exports.initGlobals = initGlobals;


/***/ },

/***/ 202:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var lodash_1 = __webpack_require__(203);
	var Config = (function () {
	    function Config() {
	        this.gamesDataURL = "https://clientupdate-v6.cursecdn.com/Feed/games/v10/games.json";
	        this.gameIconURLTemplate = lodash_1.template("https://clientupdate-v6.cursecdn.com/GameAssets/<%= gameID %>/Icon64.png");
	        this.gameKeys = ['Id', 'Name', 'SupportsAddons', 'SupportsVoice', 'order', 'Slug', 'fileName', 'section', 'icon'];
	        this.fetchStartingMsg = "Fetching the games data!";
	        this.fetchErrorMsg = "There was an error with the fetching of the games data!";
	        this.fetchSuccessMsg = "Done with fetching of the games data!";
	        this.fetchDetailsMsg = lodash_1.template("Showing details for <%= fileID %>");
	        this.api = { "list": { "url": lodash_1.template("http://thegamesdb.net/api/GetGamesList.php?name=<%= nameID %>"), "art": { "url": lodash_1.template("http://thegamesdb.net/api/GetArt.php?id=<%= artID %>") } }
	        };
	    }
	    return Config;
	}());
	exports.Config = Config;


/***/ },

/***/ 204:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var games_1 = __webpack_require__(205);
	var details_1 = __webpack_require__(207);
	var lodash_1 = __webpack_require__(203);
	var globals_1 = __webpack_require__(179);
	var initialState = {
	    games: [],
	    message: '',
	    status: 'init',
	    active: {}
	};
	function gamesReducer(state, action) {
	    if (state === void 0) { state = initialState; }
	    switch (action.type) {
	        case games_1.FETCH_GAMES_STARTED:
	            return {
	                games: state.games,
	                message: globals_1.config.fetchStartingMsg,
	                status: 'working' // 202
	            };
	            break;
	        case games_1.FETCH_GAMES_FAILED:
	            return {
	                games: state.games,
	                message: globals_1.config.fetchErrorMsg,
	                status: 'failed' // 400
	            };
	            break;
	        case games_1.FETCH_GAMES_SUCCEEDED:
	            return {
	                games: state.games.concat(action.items),
	                message: globals_1.config.fetchSuccessMsg,
	                status: 'done' // 200
	            };
	            break;
	        case details_1.GET_GAME_DETAILS:
	            return {
	                games: state.games,
	                message: globals_1.config.fetchDetailsMsg({ fileID: action.item['Name'] }),
	                status: 'details',
	                active: action.item
	            };
	    }
	    return state;
	}
	exports.gamesReducer = gamesReducer;
	function addKeys(games) {
	    games.forEach(function (game) {
	        var tmpl = {
	            Icon: globals_1.config.gameIconURLTemplate({ gameID: game['ID'] })
	        };
	        Object.assign(game, tmpl);
	    });
	    return games;
	}
	exports.addKeys = addKeys;
	function sortKeys(objectIds, key) {
	    return lodash_1.sortBy(objectIds, key);
	}
	exports.sortKeys = sortKeys;
	function filterKeys(data, keysToFilter) {
	    keysToFilter.forEach(function (key, index, array) {
	        array[index] = key.toLowerCase();
	    });
	    return data.map(function (item) {
	        return Object.keys(item).reduce(function (result, key) {
	            var tempKey = key.toLowerCase();
	            if (keysToFilter.indexOf(tempKey) !== -1)
	                result[key] = item[key];
	            return result;
	        }, {});
	    });
	}
	exports.filterKeys = filterKeys;
	function remapKeys(games) {
	    return addKeys(sortKeys(filterKeys(games, globals_1.config.gameKeys), 'Order'));
	}
	exports.remapKeys = remapKeys;
	function parseGames(state) {
	    if (state.status === 'done') {
	        Object.assign(state.games, remapKeys(state.games));
	    }
	    return state;
	}
	exports.parseGames = parseGames;


/***/ },

/***/ 205:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var utilities_1 = __webpack_require__(206);
	exports.FETCH_GAMES_STARTED = 'FETCH_GAMES_STARTED';
	function fetchGamesStarted() {
	    return { type: exports.FETCH_GAMES_STARTED };
	}
	exports.FETCH_GAMES_SUCCEEDED = 'FETCH_GAMES_SUCCEEDED';
	function fetchGamesSucceeded(data) {
	    return { type: exports.FETCH_GAMES_SUCCEEDED, items: data };
	}
	exports.FETCH_GAMES_FAILED = 'FETCH_GAMES_FAILED';
	function fetchGamesFailed(data) {
	    return { type: exports.FETCH_GAMES_FAILED, items: data };
	}
	// Fetch Games Thunk
	function fetchGames(endpoint) {
	    return function (dispatch, getState) {
	        // Implement remainder of thunk
	        fetch(endpoint)
	            .then(function (response) { return response.json(); })
	            .then(function (json) { return dispatch(fetchGamesSucceeded(json.data)); })
	            .catch(function (error) { return dispatch(fetchGamesFailed(error)); });
	    };
	}
	exports.fetchGames = fetchGames;
	function fetchArt(endpoint) {
	    return function (dispatch, getState) {
	        /* TODO: implement middleware to do the transforms */
	        // XML parsing solution for whatwg-fetch...
	        fetch(endpoint, { mode: 'no-cors' }).then(function (res) {
	            res.arrayBuffer().then(function (buffer) {
	                var parser = new DOMParser();
	                console.log(parser);
	                var view = new Uint8Array(buffer);
	                var buffer = parser.parseFromBuffer(view, view.length, 'text/xml');
	                console.log(utilities_1.xmlToJson(buffer));
	            });
	        }).catch(function (error) { return dispatch(fetchGamesFailed(error)); });
	    };
	}
	exports.fetchArt = fetchArt;
	function fetchAll(endpoint) {
	    return function (dispatch, getState) {
	        Promise.all([
	            dispatch(fetchGamesStarted()),
	            dispatch(fetchGames(endpoint))
	        ]);
	    };
	}
	exports.fetchAll = fetchAll;


/***/ },

/***/ 206:
/***/ function(module, exports) {

	"use strict";
	function xmlToJson(xml) {
	    debugger;
	    // Create the return object
	    var obj = {};
	    if (xml.nodeType == 1) {
	        // do attributes
	        if (xml.attributes.length > 0) {
	            obj["@attributes"] = {};
	            for (var j = 0; j < xml.attributes.length; j++) {
	                var attribute = xml.attributes.item(j);
	                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
	            }
	        }
	    }
	    else if (xml.nodeType == 3) {
	        obj = xml.nodeValue;
	    }
	    // do children
	    if (xml.hasChildNodes()) {
	        for (var i = 0; i < xml.childNodes.length; i++) {
	            var item = xml.childNodes.item(i);
	            var nodeName = item.nodeName;
	            if (typeof (obj[nodeName]) == "undefined") {
	                obj[nodeName] = xmlToJson(item);
	            }
	            else {
	                if (typeof (obj[nodeName].push) == "undefined") {
	                    var old = obj[nodeName];
	                    obj[nodeName] = [];
	                    obj[nodeName].push(old);
	                }
	                obj[nodeName].push(xmlToJson(item));
	            }
	        }
	    }
	    return obj;
	}
	exports.xmlToJson = xmlToJson;
	;


/***/ },

/***/ 207:
/***/ function(module, exports) {

	"use strict";
	exports.GET_GAME_DETAILS = 'GET_GAME_DETAILS';
	function getGameDetails(data) {
	    return { type: exports.GET_GAME_DETAILS, item: data };
	}
	function showDetails(payload) {
	    return function (dispatch, getState) {
	        dispatch(getGameDetails(payload));
	    };
	}
	exports.showDetails = showDetails;


/***/ },

/***/ 208:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var react_router_1 = __webpack_require__(209);
	var react_redux_1 = __webpack_require__(264);
	var globals_1 = __webpack_require__(179);
	var App_1 = __webpack_require__(271);
	var GameListContainer_1 = __webpack_require__(272);
	var Root = (function (_super) {
	    __extends(Root, _super);
	    function Root() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Root.prototype.render = function () {
	        return (React.createElement(react_redux_1.Provider, { store: globals_1.store },
	            React.createElement(react_router_1.Router, { history: react_router_1.browserHistory },
	                React.createElement(react_router_1.Route, { path: '/', component: App_1.App },
	                    React.createElement(react_router_1.IndexRoute, { component: GameListContainer_1.GameListContainer })))));
	    };
	    return Root;
	}(React.Component));
	exports.Root = Root;


/***/ },

/***/ 271:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var App = (function (_super) {
	    __extends(App, _super);
	    function App() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    App.prototype.render = function () {
	        return (React.createElement("div", null, this.props.children));
	    };
	    return App;
	}(React.Component));
	exports.App = App;


/***/ },

/***/ 272:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var redux_1 = __webpack_require__(180);
	var react_redux_1 = __webpack_require__(264);
	var GameList_1 = __webpack_require__(273);
	var games_1 = __webpack_require__(205);
	var details_1 = __webpack_require__(207);
	var gamesReducer_1 = __webpack_require__(204);
	function mapStateToProps(state, props) {
	    return {
	        games: gamesReducer_1.parseGames(state.games),
	        message: state.message,
	        status: state.status,
	        active: state.active
	    };
	}
	;
	function mapDispatchToProps(dispatch) {
	    return redux_1.bindActionCreators({
	        fetchAll: games_1.fetchAll,
	        showDetails: details_1.showDetails
	    }, dispatch);
	}
	;
	// tslint:disable-next-line:variable-name
	exports.GameListContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(GameList_1.GameList);


/***/ },

/***/ 273:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var globals_1 = __webpack_require__(179);
	var GameLoader_1 = __webpack_require__(274);
	var GameDetails_1 = __webpack_require__(275);
	var GameList = (function (_super) {
	    __extends(GameList, _super);
	    function GameList() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    GameList.prototype._fetchGames = function () {
	        this.props.fetchAll(globals_1.config.gamesDataURL);
	    };
	    GameList.prototype._showDetails = function (idx) {
	        this.props.showDetails(this.props.games.games[idx]);
	    };
	    GameList.prototype.render = function () {
	        var _this = this;
	        if (this.props.games.status === 'done' || this.props.games.status === 'details') {
	            var boxes = this.props.games.games.map(function (game, index) {
	                return (React.createElement("div", { key: game['ID'], className: 'portrait', onClick: _this._showDetails.bind(_this, index) },
	                    React.createElement("img", { src: game.Icon }),
	                    React.createElement("div", { className: 'feature-container' },
	                        React.createElement("div", { className: 'feature' },
	                            " addons: ",
	                            game.SupportsAddons ? 'yes' : 'no'),
	                        React.createElement("div", { className: 'feature' },
	                            " voice: ",
	                            game.SupportsVoice ? 'yes' : 'no')),
	                    React.createElement("p", null, game.Slug)));
	            }, this);
	            var dom = (React.createElement("div", { className: 'GameList--display' },
	                React.createElement("h1", null, "Games"),
	                React.createElement("div", null,
	                    React.createElement("div", { className: 'row' },
	                        React.createElement("div", { className: 'col', id: "GameDisplay--nodelist" }, boxes)),
	                    React.createElement("br", null))));
	        }
	        else if (this.props.games.status === 'working') {
	            var dom = (React.createElement(GameLoader_1.GameLoader, { message: this.props.games.message }));
	        }
	        else if (this.props.games.status === 'init') {
	            var dom = (React.createElement("div", { className: 'GameList--root' },
	                React.createElement("img", { src: "/assets/images/flame.png" }),
	                React.createElement("h1", null, "Curse React Test"),
	                React.createElement("p", null,
	                    "This is the GameList component, located in ",
	                    React.createElement("code", null, "components/games/GameList.tsx"),
	                    ". Start your implementation here."),
	                React.createElement("p", null, this.props.games.message),
	                React.createElement("div", { className: 'GameList--start' },
	                    React.createElement("div", { className: 'start' },
	                        React.createElement("div", { className: 'start__button' },
	                            React.createElement("span", { className: 'start__text', onClick: this._fetchGames.bind(this) }, "Start"))))));
	        }
	        return (React.createElement("div", null,
	            dom,
	            this.props.games.status === 'details'
	                ? React.createElement(GameDetails_1.GameDetails, { game: this.props.games.active })
	                : null));
	    };
	    return GameList;
	}(React.Component));
	exports.GameList = GameList;
	Object.defineProperty(exports, "__esModule", { value: true });
	// for Jest testing..
	exports.default = GameList;


/***/ },

/***/ 274:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var GameLoader = (function (_super) {
	    __extends(GameLoader, _super);
	    function GameLoader() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    GameLoader.prototype.render = function () {
	        return (React.createElement("div", { className: 'GameList--root' },
	            React.createElement("div", { className: "GameList--loader" },
	                React.createElement("svg", { x: "0px", y: "0px", width: "170.49px", height: "177px", viewBox: "0 0 170.49 177", overflow: "inherit" },
	                    React.createElement("polygon", { className: "hex", points: "16.623,87 0,58.5 16.623,30 49.868,30 66.49,58.5 49.868,87 " }),
	                    React.createElement("polygon", { className: "hex", points: "68.623,57 52,28.5 68.623,0 101.868,0 118.49,28.5 101.868,57 " }),
	                    React.createElement("polygon", { className: "hex", points: "120.623,87 104,58.5 120.623,30 153.868,30 170.49,58.5 153.868,87 " }),
	                    React.createElement("polygon", { className: "hex", points: "120.623,147 104,118.5 120.623,90 153.868,90 170.49,118.5 153.868,147 " }),
	                    React.createElement("polygon", { className: "hex", points: "68.623,177 52,148.5 68.623,120 101.868,120 118.49,148.5 101.868,177 " }),
	                    React.createElement("polygon", { className: "hex", points: "16.623,147 0,118.5 16.623,90 49.868,90 66.49,118.5 49.868,147 " }),
	                    React.createElement("polygon", { className: "hex", points: "68.623,117 52,88.5 68.623,60 101.868,60 118.49,88.5 101.868,117 " })),
	                React.createElement("p", null, this.props.message))));
	    };
	    return GameLoader;
	}(React.Component));
	exports.GameLoader = GameLoader;
	Object.defineProperty(exports, "__esModule", { value: true });
	// for Jest testing..
	exports.default = GameLoader;


/***/ },

/***/ 275:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var GameDetails = (function (_super) {
	    __extends(GameDetails, _super);
	    function GameDetails() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    GameDetails.prototype.componentDidMount = function () {
	        $("#fake-browser").draggable();
	    };
	    GameDetails.prototype.render = function () {
	        var logoStyle = {
	            backgroundImage: "url(" + this.props.game['Icon'] + ")"
	        };
	        return (React.createElement("section", { id: "fake-browser" },
	            React.createElement("div", { className: "respawn", id: "respawn" }, "Click/tap to reopen browser"),
	            React.createElement("div", { className: "browser", id: "browser" },
	                React.createElement("div", { className: "window-title" },
	                    React.createElement("div", { className: "window-icon" }),
	                    React.createElement("div", { className: "title-text" }, this.props.game['Slug']),
	                    React.createElement("div", { className: "space1" })),
	                React.createElement("ul", { className: "menu" },
	                    React.createElement("li", null,
	                        React.createElement("span", null, "F"),
	                        "ile"),
	                    React.createElement("li", null,
	                        React.createElement("span", null, "E"),
	                        "dit"),
	                    React.createElement("li", null,
	                        React.createElement("span", null, "O"),
	                        "ptions"),
	                    React.createElement("li", null,
	                        React.createElement("span", null, "N"),
	                        "avigate"),
	                    React.createElement("li", null,
	                        React.createElement("span", null, "H"),
	                        "otlist"),
	                    React.createElement("li", null,
	                        React.createElement("span", null, "A"),
	                        "nnotate"),
	                    React.createElement("li", { className: "space2" }),
	                    React.createElement("li", null,
	                        React.createElement("span", null, "H"),
	                        "elp")),
	                React.createElement("div", { className: "btns" },
	                    React.createElement("button", null,
	                        React.createElement("div", { className: "sprite open_icon" })),
	                    React.createElement("button", { disabled: "" },
	                        React.createElement("div", { className: "sprite save_icon" })),
	                    React.createElement("button", { id: "back", disabled: "" },
	                        React.createElement("div", { className: "sprite back_icon" })),
	                    React.createElement("button", { id: "forward", disabled: "" },
	                        React.createElement("div", { className: "sprite fwd_icon" })),
	                    React.createElement("button", { id: "refresh" },
	                        React.createElement("div", { className: "sprite refresh_icon" })),
	                    React.createElement("button", { disabled: "" },
	                        React.createElement("div", { className: "sprite home_icon" })),
	                    React.createElement("button", { disabled: "" },
	                        React.createElement("div", { className: "sprite copy_icon" })),
	                    React.createElement("button", { disabled: "" },
	                        React.createElement("div", { className: "sprite paste_icon" })),
	                    React.createElement("button", null,
	                        React.createElement("div", { className: "sprite paper_icon" })),
	                    React.createElement("button", { id: "print" },
	                        React.createElement("div", { className: "sprite print_icon" })),
	                    React.createElement("button", null,
	                        React.createElement("div", { className: "sprite help_icon" }))),
	                React.createElement("hr", null),
	                React.createElement("div", { className: "navigation" },
	                    React.createElement("form", null,
	                        React.createElement("label", null, "Document Title:"),
	                        React.createElement("input", { type: "text", id: "doc_title", disabled: "", value: this.props.game['Name'] }),
	                        React.createElement("label", null, "Identification:"),
	                        React.createElement("input", { type: "text", id: "doc_url", value: this.props.game['ID'] })),
	                    React.createElement("div", { className: "logo", style: logoStyle })),
	                React.createElement("hr", null),
	                React.createElement("iframe", { id: "doc", src: "" }),
	                React.createElement("hr", null),
	                React.createElement("div", { className: "window-bottom" },
	                    React.createElement("div", null),
	                    React.createElement("div", null),
	                    React.createElement("div", null)))));
	    };
	    return GameDetails;
	}(React.Component));
	exports.GameDetails = GameDetails;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(276)))

/***/ }

});
//# sourceMappingURL=app.js.map