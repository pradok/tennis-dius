# Tennis match score (using Typescript)

### Installation

```
$ npm install
```

### Run tests

```
$ npm test
```

## Notes/Assumptions

1. Due to time constraints, only tested happy path scenarios. No comprehensive Error handling except finding a player.
2. After 1st set, further invoking `pointWonBy` method in `Match` class is ignored and score will not be further updated.