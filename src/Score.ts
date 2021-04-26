import Player from './player';

export default class Score {
  private _player1: Player;
  private _player2: Player;
  private _gameFormatted: string[] = ['0', '15', '30', '40', 'Advantage'];

  public constructor(player1: Player, player2: Player) {
    this._player1 = player1;
    this._player2 = player2;
  }

  public get gamesScore(): string {
    return `${this._player1.gamesWon}-${this._player2.gamesWon}`;
  }

  public get pointsScore(): string {
    const score = `${this._gameFormatted[this._player1.points]}-${this._gameFormatted[this._player2.points]}`;
    if (score === '40-40') {
      return 'Deuce';
    }
    if (score === '0-0') {
      return '';
    }
    if (this._player1.points === 4) {
      return `Advantage ${this._player1.name}`;
    }
    if (this._player2.points === 4) {
      return `Advantage ${this._player2.name}`;
    }

    return score;
  }
}
