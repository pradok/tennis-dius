export default class Player {
  private readonly _name: string;
  private _points: number;
  private _gamesWon: number;

  public constructor(name: string) {
    this._name = name;
    this._points = 0;
    this._gamesWon = 0;
  }

  public get name(): string {
    return this._name;
  }

  public get points(): number {
    return this._points;
  }

  public winPoint(): void {
    this._points++;
  }

  public losePoint(): void {
    this._points--;
  }

  public get gamesWon(): number {
    return this._gamesWon;
  }

  public winGame(): void {
    this._gamesWon++;
    this.resetPoints();
  }

  public resetPoints(): void {
    this._points = 0;
  }
}
