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
  W: number // 勝場
  L: number // 敗場
  S: number // 救援
  HLD: number // 中繼
  PC: number // 球數
  IP: number // 投球局數
  K: number // 三振打者
  strike: number // 好球
  ball: number // 壞球
  BBPitcher: number // 保送打者
  hits: number // 被安打
  ER: number // 自責分
  RA: number // 失分
  PE: number // 投手守備失誤
  BS: number // 救援失敗
  K9: number // 9局平均三振
  KBB: number // 三振保送比
  PIP: number // 每局投球數
  R9: number // 9局平均失分
  BB9: number // 9局平均保送
  OBA: number // 被上壘率
  WHIP: number // 每局被上壘率
  ERA: number // 防禦率
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
    E: 0,
    W: 0,
    L: 0,
    S: 0,
    HLD: 0,
    PC: 0,
    IP: 0,
    K: 0,
    strike: 0,
    ball: 0,
    BBPitcher: 0,
    hits: 0,
    ER: 0,
    RA: 0,
    PE: 0,
    BS: 0,
    K9: 0,
    KBB: 0,
    PIP: 0,
    R9: 0,
    BB9: 0,
    OBA: 0,
    WHIP: 0,
    ERA: 0
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
  '守備失誤' = 'E',
  '勝投' = 'W',
  '敗投' = 'L',
  '救援' = 'S',
  '中繼' = 'HLD',
  '球數' = 'PC',
  '投球局數' = 'IP',
  '三振打者' = 'K',
  '好球' = 'strike',
  '壞球' = 'ball',
  '保送打者' = 'BBPitcher',
  '被安打' = 'hits',
  '自責分' = 'ER',
  '失分' = 'RA',
  '投手守備失誤' = 'PE',
  '救援失敗' = 'BS',
  '9局平均三振' = 'K9',
  '三振保送比' = 'KBB',
  '每局投球數' = 'PIP',
  '9局平均失分' = 'R9',
  '9局平均保送' = 'BB9',
  '被上壘率' = 'OBA',
  '每局被上壘率' = 'WHIP',
  '防禦率' = 'ERA'
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
