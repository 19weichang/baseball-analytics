export interface Game {
  season: string
  gameType: string
  group: string
  team: string
  time: number
  player: string
  number: number
  position: string
  PA: number
  AB: number
  R: number
  H: number
  SingleB: number
  DoubleB: number
  TripleB: number
  HR: number
  RBI: number
  BB: number
  SO: number
  HBP: number
  SF: number
  SH: number
  AVG: number
  OBP: number
  SLG: number
  OPS: number
}

export function emptyGame(): Game {
  return {
    season: '',
    gameType: '',
    group: '',
    team: '',
    time: 0,
    player: '',
    number: 0,
    position: '',
    PA: 0,
    AB: 0,
    R: 0,
    H: 0,
    SingleB: 0,
    DoubleB: 0,
    TripleB: 0,
    HR: 0,
    RBI: 0,
    BB: 0,
    SO: 0,
    HBP: 0,
    SF: 0,
    SH: 0,
    AVG: 0,
    OBP: 0,
    SLG: 0,
    OPS: 0
  }
}
