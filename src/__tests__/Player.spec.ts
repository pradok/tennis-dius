import Player from '../Player';

describe('Player', (): void => {
  let player: Player;

  beforeEach(
    (): void => {
      player = new Player('Player 1');
    }
  );
  it('should be instance of Player', (): void => {
    expect(player).toBeInstanceOf(Player);
    expect(player.losePoint).toBeInstanceOf(Function);
    expect(player.winPoint).toBeInstanceOf(Function);
    expect(player.winGame).toBeInstanceOf(Function);
    expect(player.name).toEqual('Player 1');
    expect(player.points).toEqual(0);
    expect(player.gamesWon).toEqual(0);
  });
});
