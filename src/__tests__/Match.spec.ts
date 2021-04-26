import Match from '../Match';

describe('Match', (): void => {
  let match: Match;
  const player1 = 'Roger Federer';
  const player2 = 'Rafal Nadal';
  beforeEach((): void => {
    match = new Match(player1, player2);
  });

  it('should be instance of Match', (): void => {
    expect(match).toBeInstanceOf(Match);
    expect(match.pointWonBy).toBeInstanceOf(Function);
    expect(match.score).toBeInstanceOf(Function);
  });

  describe('Normal games and game winner is decided', (): void => {
    it(`check scores and ${player2} wins game`, (): void => {
      match.pointWonBy(player1);
      expect(match.score()).toEqual('0-0, 15-0');
      match.pointWonBy(player2);
      expect(match.score()).toEqual('0-0, 15-15');
      match.pointWonBy(player2);
      expect(match.score()).toEqual('0-0, 15-30');
      match.pointWonBy(player2);
      expect(match.score()).toEqual('0-0, 15-40');
      match.pointWonBy(player2);
      expect(match.score()).toEqual('0-1');
    });
    it(`check Deuce and Advantage scores and ${player2} ultimately wins game`, (): void => {
      match.pointWonBy(player1);
      expect(match.score()).toEqual('0-0, 15-0');
      match.pointWonBy(player2);
      expect(match.score()).toEqual('0-0, 15-15');
      match.pointWonBy(player1);
      expect(match.score()).toEqual('0-0, 30-15');
      match.pointWonBy(player2);
      expect(match.score()).toEqual('0-0, 30-30');
      match.pointWonBy(player1);
      expect(match.score()).toEqual('0-0, 40-30');
      match.pointWonBy(player2);
      expect(match.score()).toEqual('0-0, Deuce');
      match.pointWonBy(player2);
      expect(match.score()).toEqual(`0-0, Advantage ${player2}`);
      match.pointWonBy(player1);
      expect(match.score()).toEqual('0-0, Deuce');
      match.pointWonBy(player1);
      expect(match.score()).toEqual(`0-0, Advantage ${player1}`);
      match.pointWonBy(player2);
      expect(match.score()).toEqual('0-0, Deuce');
      match.pointWonBy(player2);
      expect(match.score()).toEqual(`0-0, Advantage ${player2}`);
      match.pointWonBy(player1);
      expect(match.score()).toEqual('0-0, Deuce');
      match.pointWonBy(player1);
      expect(match.score()).toEqual(`0-0, Advantage ${player1}`);
      match.pointWonBy(player1);
      expect(match.score()).toEqual('1-0');
    });
  });
});
