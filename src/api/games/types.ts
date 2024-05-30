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
  AO: number
  GO: number
  HBP: number
  ERRCH: number
  CI: number
  SB: number
  CS: number
  SBP: number
  SF: number
  SH: number
  AVG: number
  OBP: number
  SLG: number
  OPS: number
  E: number
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
    AO: 0,
    GO: 0,
    HBP: 0,
    ERRCH: 0,
    CI: 0,
    SB: 0,
    CS: 0,
    SBP: 0,
    SF: 0,
    SH: 0,
    AVG: 0,
    OBP: 0,
    SLG: 0,
    OPS: 0,
    E: 0
  }
}

export enum GameEnglish {
  '年度' = 'season',
  '賽事' = 'gameType',
  '組別' = 'group',
  '球隊' = 'team',
  '時間' = 'time',
  '球員' = 'player',
  '背號' = 'number',
  '守備位置' = 'position',
  '打席數' = 'PA',
  '打數' = 'AB',
  '得分' = 'R',
  '安打' = 'H',
  '一壘安打' = 'SingleB',
  '二壘安打' = 'DoubleB',
  '三壘安打' = 'TripleB',
  '全壘打' = 'HR',
  '打點' = 'RBI',
  '保送' = 'BB',
  '三振' = 'SO',
  '飛球出局' = 'AO',
  '滾地球出局' = 'GO',
  '觸身球' = 'HBP',
  '失誤上壘' = 'ERRCH',
  '捕手妨礙打擊' = 'CI',
  '盜壘' = 'SB',
  '盜壘失敗' = 'CS',
  '盜壘成功率' = 'SBP',
  '高飛犧牲打' = 'SF',
  '犧牲觸擊' = 'SH',
  '打擊率' = 'AVG',
  '上壘率' = 'OBP',
  '長打率' = 'SLG',
  '綜合攻擊指數' = 'OPS',
  '守備失誤' = 'E'
}

export enum GameChinese {
  '年度' = 'season',
  '賽事' = 'gameType',
  '組別' = 'group',
  '球隊' = 'team',
  '時間' = 'time',
  '球員' = 'player',
  '背號' = 'number',
  '守備位置' = 'position',
  '打席數' = 'PA',
  '打數' = 'AB',
  '得分' = 'R',
  '安打' = 'H',
  '一壘安打' = 'SingleB',
  '二壘安打' = 'DoubleB',
  '三壘安打' = 'TripleB',
  '全壘打' = 'HR',
  '打點' = 'RBI',
  '保送' = 'BB',
  '三振' = 'SO',
  '飛球出局' = 'AO',
  '滾地出局' = 'GO',
  '觸身球' = 'HBP',
  '失誤上壘' = 'ERRCH',
  '捕手妨礙打擊' = 'CI',
  '盜壘' = 'SB',
  '盜壘失敗' = 'CS',
  '高飛犧牲打' = 'SF',
  '犧牲觸擊' = 'SH',
  '打擊率' = 'AVG',
  '上壘率' = 'OBP',
  '長打率' = 'SLG',
  '綜合攻擊指數' = 'OPS',
  '守備失誤' = 'E'
}
