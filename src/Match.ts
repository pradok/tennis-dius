import Player from './player';
import Score from './Score';

export default class Match {
  private gameFormat: string[] = ['0', '15', '30', '40', 'Advantage'];
  private _players: Player[] = [];
  private _score: Score;

  public constructor(player1: string, player2: string) {
    this._players.push(new Player(player1));
    this._players.push(new Player(player2));
    this._score = new Score(this._players[0], this._players[1]);
  }

  public pointWonBy(name: string): void {
    const playerIndex = this.findPlayerIndex(name);
    const winner = this._players[playerIndex];
    const loser = this._players[1 - playerIndex];

    if (this._determineSetWinner(winner, loser)) {
      return;
    }

    if (this._determineGameWinner(winner, loser)) {
      return;
    }
    // If loser was on 4 (Advantage), loses a point to go back to 3
    if (loser.points === 4) {
      loser.losePoint();
      // Go back to Deuce, winner doesn't get any point.
      if (winner.points === 3) {
        return;
      }
    }

    winner.winPoint();
  }

  public score(): string {
    const gamesScore: string = this._score.gamesScore;
    const pointsScore: string = this._score.pointsScore;
    if (pointsScore === '') {
      return gamesScore;
    }
    return `${gamesScore}, ${pointsScore}`;
  }

  private _determineSetWinner(winner: Player, loser: Player): boolean {
    if (winner.gamesWon === 6 && loser.gamesWon < 5) {
      return true;
    }
    if (winner.gamesWon === 7 && loser.gamesWon < 6) {
      return true;
    }
    return false;
  }

  private _determineGameWinner(winner: Player, loser: Player): boolean {
    // If winner was already on 40 and loser is less than 40
    if (winner.points === 3 && loser.points < 3) {
      winner.winGame();
      loser.resetPoints();
      return true;
    }
    // Determine winner if was already on 4 (Advantage)
    if (winner.points === 4 && loser.points < 4) {
      winner.winGame();
      loser.resetPoints();
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