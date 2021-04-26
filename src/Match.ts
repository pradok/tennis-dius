import {
  GAMES_SET_THRESHOLD,
  GAMES_SET_TIE_THRESHOLD,
  POINTS_ADVANTAGE_THRESHOLD,
  POINTS_WIN_THRESHOLD,
  TIEBREAK_DIFF,
  TIEBREAK_THRESHOLD,
} from './consts';
import Player from './Player';
import Score from './Score';

export default class Match {
  private _players: Player[] = [];
  private _score: Score;
  private _tiebreak: boolean = false;

  public constructor(player1: string, player2: string) {
    this._players.push(new Player(player1));
    this._players.push(new Player(player2));
    this._score = new Score(this._players[0], this._players[1]);
  }

  public pointWonBy(name: string): void {
    const playerIndex = this.findPlayerIndex(name);
    const pointWinner = this._players[playerIndex];
    const pointLoser = this._players[1 - playerIndex];

    if (this._determineSetWinner(pointWinner, pointLoser)) {
      return;
    }

    if (this._determineTieBreak(pointWinner, pointLoser)) {
      this._tiebreak = true;
      pointWinner.winPoint();
      // Determine Tie break winner.
      if (pointWinner.points >= TIEBREAK_THRESHOLD && pointWinner.points - pointLoser.points >= TIEBREAK_DIFF) {
        pointWinner.winGame();
        pointLoser.resetPoints();
        this._tiebreak = false;
        return;
      }
    } else {
      if (this._determineGameWinner(pointWinner, pointLoser)) {
        return;
      }
      // If pointLoser was on 4 (Advantage), loses a point to go back to 3
      if (pointLoser.points === POINTS_ADVANTAGE_THRESHOLD) {
        pointLoser.losePoint();
        // Go back to Deuce, winner doesn't get any point.
        if (pointWinner.points === POINTS_ADVANTAGE_THRESHOLD - 1) {
          return;
        }
      }
      pointWinner.winPoint();
    }
  }

  public score(): string {
    let pointsScore = '';
    const gamesScore: string = this._score.gamesScore;

    if (this._tiebreak) {
      if (this._players[0].points > 0 || this._players[1].points > 0) {
        pointsScore = `${this._players[0].points}-${this._players[1].points}`;
      }
    } else {
      pointsScore = this._score.pointsScore;
    }
    if (pointsScore === '') {
      return gamesScore;
    }
    return `${gamesScore}, ${pointsScore}`;
  }

  private _determineSetWinner(pointWinner: Player, pointLoser: Player): boolean {
    if (
      (pointWinner.gamesWon === GAMES_SET_THRESHOLD && pointLoser.gamesWon < GAMES_SET_THRESHOLD - 1) ||
      (pointLoser.gamesWon === GAMES_SET_THRESHOLD && pointWinner.gamesWon < GAMES_SET_THRESHOLD - 1)
    ) {
      return true;
    }
    if (
      (pointWinner.gamesWon === GAMES_SET_TIE_THRESHOLD && pointLoser.gamesWon < GAMES_SET_TIE_THRESHOLD - 1) ||
      (pointLoser.gamesWon === GAMES_SET_TIE_THRESHOLD && pointWinner.gamesWon < GAMES_SET_TIE_THRESHOLD - 1)
    ) {
      return true;
    }
    if (
      (pointWinner.gamesWon === GAMES_SET_TIE_THRESHOLD && pointLoser.gamesWon === GAMES_SET_TIE_THRESHOLD - 1) ||
      (pointLoser.gamesWon === GAMES_SET_TIE_THRESHOLD && pointWinner.gamesWon === GAMES_SET_TIE_THRESHOLD - 1)
    ) {
      return true;
    }
    return false;
  }

  private _determineTieBreak(pointWinner: Player, pointLoser: Player): boolean {
    if (pointWinner.gamesWon === GAMES_SET_THRESHOLD && pointLoser.gamesWon === GAMES_SET_THRESHOLD) {
      return true;
    }
    return false;
  }

  private _determineGameWinner(pointWinner: Player, pointLoser: Player): boolean {
    // If winner was already on 40 and pointLoser is less than 40
    if (pointWinner.points === POINTS_WIN_THRESHOLD && pointLoser.points < POINTS_WIN_THRESHOLD) {
      pointWinner.winGame();
      pointLoser.resetPoints();
      return true;
    }
    // Determine winner if was already on 4 (Advantage)
    if (pointWinner.points === POINTS_ADVANTAGE_THRESHOLD && pointLoser.points < POINTS_ADVANTAGE_THRESHOLD) {
      pointWinner.winGame();
      pointLoser.resetPoints();
      return true;
    }

    return false;
  }

  private findPlayerIndex(playerName: string): number {
    const findIndex = this._players.findIndex((player: Player): boolean => player.name === playerName);
    if (findIndex < 0) {
      throw Error(`player "${playerName}" not found`);
    }
    return findIndex;
  }
}
