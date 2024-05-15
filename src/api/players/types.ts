export enum PlayerChinese {
  number = '背號',
  img = '照片',
  name = '姓名',
  age = '年齡',
  position = '守備位置',
  gradeIndex = '總評',
  hit = '打擊',
  speed = '速度',
  defense = '守備',
  arm = '傳球',
  height = '身高',
  weight = '體重',
  pitchingAndHiterHabits = '投打習慣',
  GP = '出賽場數',
  AVG = '打擊率',
  BB = '保送',
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
  GO = '滾地球',
  SH = '犧牲觸擊',
  TA = '攻擊指數',
  ERRCH = '失誤上壘',
  SB = '盜壘',
  CS = '盜壘失敗',
  SBP = '盜壘成功率'
}

export enum PlayerEnglish {
  '背號' = 'number',
  '照片' = 'img',
  '姓名' = 'name',
  '年齡' = 'age',
  '守備位置' = 'position',
  '總評' = 'gradeIndex',
  '打擊' = 'hit',
  '速度' = 'speed',
  '守備' = 'defense',
  '傳球' = 'arm',
  '身高' = 'height',
  '體重' = 'weight',
  '投打習慣' = 'pitchingAndHiterHabits',
  '出賽場數' = 'GP',
  '打擊率' = 'AVG',
  '保送' = 'BB',
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
  '滾地球' = 'GO',
  '犧牲觸擊' = 'SH',
  '攻擊指數' = 'TA',
  '失誤' = 'ERRCH',
  '盜壘' = 'SB',
  '盜壘失敗' = 'CS',
  '盜壘成功率' = 'SBP'
}

export interface Player {
  number: number // 背號
  img: string // 照片
  name: string // 姓名
  age: number // 年齡
  position: string // 守備位置
  gradeIndex: number // 總評
  hit: string // 打擊能力
  speed: string // 速度能力
  defense: string // 守備能力
  arm: string // 傳球能力
  height: number // 身高
  weight: number // 體重
  pitchingAndHiterHabits: string // 投打習慣
  // GP: number // 出賽場數
  // AVG: number // 打擊率
  // BB: number // 保送
  // GOAO: number // 滾飛比
  // HBP: number // 觸身球
  // HR: number // 全壘打
  // SO: number // 三振
  // SLG: number // 長打率
  // AB: number // 打數
  // SingleB: number // 一壘安打
  // DoubleB: number // 二壘安打
  // TripleB: number // 三壘安打
  // AO: number // 飛球出局
  // BBP: number // 保送率
  // BBK: number // 保送三振比
  // EBH: number // 長打數
  // DP: number // 雙殺打
  // GS: number // 滿貫砲
  // IsoP: number // 純長打率
  // OBP: number // 上壘率
  // OPS: number // 綜合攻擊指數
  // PA: number // 打席數
  // R: number // 得分
  // RBI: number // 打點
  // SF: number // 高飛犧牲打
  // GO: number // 滾地球
  // SH: number // 犧牲觸擊
  // TA: number // 攻擊指數
  // ERRCH: number // 失誤上壘
  hitter: Hitter
}

export function emptyPlayer(): Player {
  return {
    number: 0,
    img: '',
    name: '',
    age: 0,
    position: '',
    gradeIndex: 0,
    hit: '',
    speed: '',
    defense: '',
    arm: '',
    height: 0,
    weight: 0,
    pitchingAndHiterHabits: '',
    // GP: 0,
    // AVG: 0,
    // BB: 0,
    // GOAO: 0,
    // HBP: 0,
    // HR: 0,
    // SO: 0,
    // SLG: 0,
    // AB: 0,
    // SingleB: 0,
    // DoubleB: 0,
    // TripleB: 0,
    // AO: 0,
    // BBP: 0,
    // BBK: 0,
    // EBH: 0,
    // DP: 0,
    // GS: 0,
    // IsoP: 0,
    // OBP: 0,
    // OPS: 0,
    // PA: 0,
    // R: 0,
    // RBI: 0,
    // SF: 0,
    // GO: 0,
    // SH: 0,
    // TA: 0,
    // ERRCH: 0
    hitter: emptyHitter()
  }
}

export interface PlayerCareer {
  name: string
  hitter: Hitter
}

export function emptyPlayerCareer(): PlayerCareer {
  return {
    name: '',
    hitter: emptyHitter()
  }
}

export interface Hitter {
  season: string
  PA: number
  AB: number
  SingleB: number
  DoubleB: number
  TripleB: number
  HR: number
  RBI: number
  R: number
  BB: number
  SO: number
  SF: number
  SH: number
  ERRCH: number
  HBP: number
  AVG: number
  OBP: number
  SLG: number
  OPS: number
  SB: number
  CS: number
  SBP: number
}

export function emptyHitter(): Hitter {
  return {
    season: '',
    PA: 0,
    AB: 0,
    SingleB: 0,
    DoubleB: 0,
    TripleB: 0,
    HR: 0,
    RBI: 0,
    R: 0,
    BB: 0,
    SO: 0,
    SF: 0,
    SH: 0,
    ERRCH: 0,
    HBP: 0,
    AVG: 0,
    OBP: 0,
    SLG: 0,
    OPS: 0,
    SB: 0,
    CS: 0,
    SBP: 0
  }
}
