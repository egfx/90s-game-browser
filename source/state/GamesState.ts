import { Game } from "../models/Game";

export interface GamesState {
    games: Game[];
    message: string;
    status: string;
    active: Game;
}
