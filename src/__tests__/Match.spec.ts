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

  describe(`${player1}`, (): void => {
    beforeEach((): void => {
      for (let game = 0; game < 6; game++) {
        for (let point = 0; point < 4; point++) {
          match.pointWonBy(player1);
        }
        for (let point = 0; point < 4; point++) {
          if (game < 4) {
            match.pointWonBy(player2);
          }
        }
      }
    });
    it('wins set by 6-4', (): void => {
      expect(match.score()).toEqual('6-4');
    });
  });

  describe(`${player2}`, (): void => {
    beforeEach((): void => {
      for (let game = 0; game < 8; game++) {
        for (let point = 0; point < 4; point++) {
          if (game < 5) {
            match.pointWonBy(player1);
          }
        }
        for (let point = 0; point < 4; point++) {
          match.pointWonBy(player2);
        }
      }
    });
    it('wins set by 5-7', (): void => {
      expect(match.score()).toEqual('5-7');
    });
  });

  describe(`Tie Break`, (): void => {
    beforeEach((): void => {
      for (let game = 0; game < 6; game++) {
        for (let point = 0; point < 4; point++) {
          match.pointWonBy(player1);
        }
        for (let point = 0; point < 4; point++) {
          match.pointWonBy(player2);
        }
      }
      expect(match.score()).toEqual('6-6');
    });
    it(`should set the score correctly and ${player1} should win the tie break`, (): void => {
      for (let point = 0; point < 7; point++) {
        match.pointWonBy(player1);
      }
      expect(match.score()).toEqual('7-6');
    });
    it(`should be even with no winner till both reach 6 points or above`, (): void => {
      for (let point = 0; point < 8; point++) {
        match.pointWonBy(player1);
        match.pointWonBy(player2);
      }
      expect(match.score()).toEqual('6-6, 8-8');
    });
    it(`${player2} should win the tie break with difference of two points`, (): void => {
      for (let point = 0; point < 6; point++) {
        match.pointWonBy(player1);
        match.pointWonBy(player2);
      }
      match.pointWonBy(player2);
      match.pointWonBy(player2);
      expect(match.score()).toEqual('6-7');
    });
  });
});
