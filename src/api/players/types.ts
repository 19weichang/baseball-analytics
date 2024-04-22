export enum PlayerChinese {
  number = '背號',
  name = '姓名',
  age = '年齡',
  position = '守備位置',
  gradeIndex = '總評',
  hit = '打擊',
  speed = '速度',
  defense = '守備',
  arm = '傳球',
  GP = '出賽場數',
  BA = '打擊率',
  BB = '保送',
  H = '安打',
  GOAO = '滾飛比',
  HBP = '觸身球',
  HR = '全壘打',
  SO = '三振',
  SLG = '長打率',
  AB = '打數',
  SingleB = '一壘安打',
  DoubleB = '二壘安打',
  TripleB = '三壘安打',
  AO = '飛球出局',
  BBP = '保送率',
  BBK = '保送三振比',
  EBH = '長打數',
  DP = '雙殺打',
  GS = '滿貫砲',
  IsoP = '純長打率',
  OBP = '上壘率',
  OPS = '綜合攻擊指數',
  PA = '打席數',
  R = '得分',
  RBI = '打點',
  SF = '高飛犧牲打',
  SH = '犧牲觸擊',
  TA = '攻擊指數'
}

export enum PlayerEnglish {
  '背號' = 'number',
  '姓名' = 'name',
  '年齡' = 'age',
  '守備位置' = 'position',
  '總評' = 'gradeIndex',
  '打擊' = 'hit',
  '速度' = 'speed',
  '守備' = 'defense',
  '傳球' = 'arm',
  '出賽場數' = 'GP',
  '打擊率' = 'BA',
  '保送' = 'BB',
  '安打' = 'H',
  '滾飛比' = 'GOAO',
  '觸身球' = 'HBP',
  '全壘打' = 'HR',
  '三振' = 'SO',
  '長打率' = 'SLG',
  '打數' = 'AB',
  '一壘安打' = 'SingleB',
  '二壘安打' = 'DoubleB',
  '三壘安打' = 'TripleB',
  '飛球出局' = 'AO',
  '保送率' = 'BBP',
  '保送三振比' = 'BBK',
  '長打數' = 'EBH',
  '雙殺打' = 'DP',
  '滿貫砲' = 'GS',
  '純長打率' = 'IsoP',
  '上壘率' = 'OBP',
  '綜合攻擊指數' = 'OPS',
  '打席數' = 'PA',
  '得分' = 'R',
  '打點' = 'RBI',
  '高飛犧牲打' = 'SF',
  '犧牲觸擊' = 'SH',
  '攻擊指數' = 'TA'
}

export interface Player {
  number: number // 背號
  name: string // 姓名
  age: number // 年齡
  position: string // 守備位置
  gradeIndex: number // 總評
  hit: string // 打擊能力
  speed: string // 速度能力
  defense: string // 守備能力
  arm: string // 傳球能力
  GP: number // 出賽場數
  BA: number // 打擊率
  BB: number // 保送
  H: number // 安打
  GOAO: number // 滾飛比
  HBP: number // 觸身球
  HR: number // 全壘打
  SO: number // 三振
  SLG: number // 長打率
  AB: number // 打數
  SingleB: number // 一壘安打
  DoubleB: number // 二壘安打
  TripleB: number // 三壘安打
  AO: number // 飛球出局
  BBP: number // 保送率
  BBK: number // 保送三振比
  EBH: number // 長打數
  DP: number // 雙殺打
  GS: number // 滿貫砲
  IsoP: number // 純長打率
  OBP: number // 上壘率
  OPS: number // 綜合攻擊指數
  PA: number // 打席數
  R: number // 得分
  RBI: number // 打點
  SF: number // 高飛犧牲打
  SH: number // 犧牲觸擊
  TA: number // 攻擊指數
}
