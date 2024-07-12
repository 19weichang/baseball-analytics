// import { read } from '../../utils/xlsx'
import * as xlsx from 'xlsx'
import { readWorkbookFromRemoteFile } from '../../utils/xlsx'
import {
  Player,
  PlayerEnglish,
  Hitter,
  HitterEnglish,
  Pitcher,
  PitcherEnglish
} from './types'
import { utils } from 'xlsx'

const key = import.meta.env.VITE_GOOGLE_API_KEY
const sheetId = import.meta.env.VITE_GOOGLE_SHEET_DOC_ID

export async function getPlayers() {
  if (!key) {
    throw new Error('Google API Key is not defined')
  }

  const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=xlsx`
  const file = new Promise((resolve) => {
    const callback = (workbook: xlsx.WorkBook) => {
      const sheet = workbook.Sheets['players']
      const json = utils.sheet_to_json(sheet)
      resolve(json)
    }
    readWorkbookFromRemoteFile(sheetUrl, callback)
  })
  const players: Player[] = (await file) as Player[]
  return transformEnglish(players) as Player[]
}

export function transformEnglish(players: Player[]) {
  const player = players.map((item) => {
    const obj = {}
    const keys = Object.keys(PlayerEnglish)
    keys.forEach((key) => {
      if (isVaildKey(key, PlayerEnglish)) {
        const en = PlayerEnglish[key]
        obj[en] = item[key]
      }
    })
    return obj
  })

  return player
}

//typeError -> 因為 'string' 類型的運算式無法用於索引類型 'typeof'，所以項目隱含 'any' 類型。
//解決為下列函式: 使用keyof typeof object
export function isVaildKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return key in object
}

export async function getPlayer(playerNumber: number) {
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=xlsx`
  const file = new Promise((resolve) => {
    const callback = (workbook: xlsx.WorkBook) => {
      const sheet = workbook.Sheets['players']
      const json = utils.sheet_to_json(sheet)
      resolve(json)
    }
    readWorkbookFromRemoteFile(sheetUrl, callback)
  })
  const players: Player[] = (await file) as Player[]
  const playersArr = transformEnglish(players) as Player[]
  const playerIndex = playersArr.map((n) => n.number).indexOf(playerNumber)
  const player = playersArr[playerIndex]
  return player
}

export async function getPlayerHitter(player: string) {
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=xlsx`
  const file = new Promise((resolve) => {
    const callback = (workbook: xlsx.WorkBook) => {
      const sheet = workbook.Sheets[player]
      const json = utils.sheet_to_json(sheet)
      resolve(json)
    }
    readWorkbookFromRemoteFile(sheetUrl, callback)
  })
  const Info: Hitter[] = (await file) as Hitter[]
  const playerInfo = transformHitterEnglish(Info) as Hitter[]
  const gameLength = playerInfo.length
  const result: Hitter[] = []
  for (const key in playerInfo) {
    const item = playerInfo[key]
    const season = item.season
    const PA = item.PA
    const AB = item.AB
    const SingleB = item.SingleB
    const DoubleB = item.DoubleB
    const TripleB = item.TripleB
    const HR = item.HR
    const RBI = item.RBI
    const R = item.R
    const BB = item.BB
    const SO = item.SO
    const GO = item.GO
    const AO = item.AO
    const SF = item.SF
    const SH = item.SH
    const ERRCH = item.ERRCH
    const HBP = item.HBP
    const AVG = item.AVG
    const OBP = item.OBP
    const SLG = item.SLG
    const OPS = item.OPS
    const SB = item.SB
    const CS = item.CS
    const E = item.E

    if (!result[parseInt(season)]) {
      result[parseInt(season)] = {
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
        GO: 0,
        AO: 0,
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
        SBP: 0,
        E: 0
      }
    }

    result[parseInt(season)].PA += PA
    result[parseInt(season)].AB += AB
    result[parseInt(season)].SingleB += SingleB
    result[parseInt(season)].DoubleB += DoubleB
    result[parseInt(season)].TripleB += TripleB
    result[parseInt(season)].HR += HR
    result[parseInt(season)].RBI += RBI
    result[parseInt(season)].R += R
    result[parseInt(season)].BB += BB
    result[parseInt(season)].SO += SO
    result[parseInt(season)].GO += GO
    result[parseInt(season)].AO += AO
    result[parseInt(season)].SF += SF
    result[parseInt(season)].SH += SH
    result[parseInt(season)].ERRCH += ERRCH
    result[parseInt(season)].HBP += HBP
    result[parseInt(season)].AVG += AVG / gameLength
    result[parseInt(season)].OBP += OBP / gameLength
    result[parseInt(season)].SLG += SLG / gameLength
    result[parseInt(season)].OPS += OPS / gameLength
    result[parseInt(season)].SB += SB
    result[parseInt(season)].CS += CS
    result[parseInt(season)].SBP = SB / (SB + CS) || 0
    result[parseInt(season)].E += E
  }

  const careerArray = Object.entries(result).map(
    ([
      season,
      {
        PA,
        AB,
        SingleB,
        DoubleB,
        TripleB,
        HR,
        RBI,
        R,
        BB,
        SO,
        GO,
        AO,
        SF,
        SH,
        ERRCH,
        HBP,
        AVG,
        OBP,
        SLG,
        OPS,
        SB,
        CS,
        SBP,
        E
      }
    ]) => ({
      season,
      PA,
      AB,
      SingleB,
      DoubleB,
      TripleB,
      HR,
      RBI,
      R,
      BB,
      SO,
      GO,
      AO,
      SF,
      SH,
      ERRCH,
      HBP,
      AVG,
      OBP,
      SLG,
      OPS,
      SB,
      CS,
      SBP,
      E
    })
  )
  const arr = careerArray.map((item) => ({
    ...item,
    season: item.season,
    SBP: item.SB / (item.SB + item.CS) || 0
  }))
  return arr
}

function transformHitterEnglish(hitters: Hitter[]) {
  const hitter = hitters.map((item) => {
    const obj = {}
    const keys = Object.keys(HitterEnglish)
    keys.forEach((key) => {
      if (isVaildKey(key, HitterEnglish)) {
        const en = HitterEnglish[key]
        obj[en] = item[key]
      }
    })
    return obj
  })

  return hitter
}

export async function getPlayerPitcher(player: string) {
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=xlsx`
  const file = new Promise((resolve) => {
    const callback = (workbook: xlsx.WorkBook) => {
      const sheet = workbook.Sheets[player]
      const json = utils.sheet_to_json(sheet)
      resolve(json)
    }
    readWorkbookFromRemoteFile(sheetUrl, callback)
  })
  const Info: Pitcher[] = (await file) as Pitcher[]
  // const gameLength = getPitcherGameLength(Info)
  const playerInfo = transformPitcherEnglish(Info) as Pitcher[]
  const gameLength = getPitcherGameLength(playerInfo)
  const result: Pitcher[] = []
  for (const key in playerInfo) {
    const item = playerInfo[key]
    const season = item.season
    const pitcherGameLength = gameLength
    const W = item.W
    const L = item.L
    const S = item.S
    const HLD = item.HLD
    const PC = item.PC
    const IP = item.IP
    const K = item.K
    const strike = item.strike
    const ball = item.ball
    const BBPitcher = item.BBPitcher
    const hits = item.hits
    const ER = item.ER
    const RA = item.RA
    const PE = item.PE
    const BS = item.BS
    // const K9 = item.K9
    // const KBB = item.KBB
    // const PIP = item.PIP
    // const R9 = item.R9
    // const BB9 = item.BB9
    // const OBA = item.OBA
    // const WHIP = item.WHIP
    // const ERA = item.ERA

    if (!result[parseInt(season)]) {
      result[parseInt(season)] = {
        season: '',
        pitcherGameLength: 0,
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

    result[parseInt(season)].pitcherGameLength = pitcherGameLength
    result[parseInt(season)].W += W
    result[parseInt(season)].L += L
    result[parseInt(season)].S += S
    result[parseInt(season)].HLD += HLD
    result[parseInt(season)].PC += PC || 0
    result[parseInt(season)].IP += peopleToIP(IPToPeopleCount(IP))
    result[parseInt(season)].K += K
    result[parseInt(season)].strike += strike
    result[parseInt(season)].ball += ball
    result[parseInt(season)].BBPitcher += BBPitcher
    result[parseInt(season)].hits += hits
    result[parseInt(season)].ER += ER
    result[parseInt(season)].RA += RA
    result[parseInt(season)].PE += PE
    result[parseInt(season)].BS += BS
    result[parseInt(season)].K9 =
      (K * 9) / peopleToIP(IPToPeopleCount(IP)) / gameLength
    result[parseInt(season)].KBB =
      K / BBPitcher / gameLength === Infinity ? 999 : K / BBPitcher
    result[parseInt(season)].PIP =
      PC / peopleToIP(IPToPeopleCount(IP)) / gameLength
    result[parseInt(season)].R9 =
      (RA * 9) / peopleToIP(IPToPeopleCount(IP)) / gameLength
    result[parseInt(season)].BB9 =
      (BBPitcher * 9) / peopleToIP(IPToPeopleCount(IP)) / gameLength
    result[parseInt(season)].OBA =
      (hits + BBPitcher) / (IPToPeopleCount(IP) + BBPitcher)
    result[parseInt(season)].WHIP =
      (hits + BBPitcher) / peopleToIP(IPToPeopleCount(IP)) / gameLength
    result[parseInt(season)].ERA =
      ERAfunc(result[parseInt(season)].ER, peopleToIP(IPToPeopleCount(IP))) /
      gameLength
  }

  const careerArray = Object.entries(result).map(
    ([
      season,
      {
        pitcherGameLength,
        W,
        L,
        S,
        HLD,
        PC,
        IP,
        K,
        strike,
        ball,
        BBPitcher,
        hits,
        ER,
        RA,
        PE,
        BS,
        K9,
        KBB,
        PIP,
        R9,
        BB9,
        OBA,
        WHIP,
        ERA
      }
    ]) => ({
      season,
      pitcherGameLength,
      W,
      L,
      S,
      HLD,
      PC,
      IP,
      K,
      strike,
      ball,
      BBPitcher,
      hits,
      ER,
      RA,
      PE,
      BS,
      K9,
      KBB,
      PIP,
      R9,
      BB9,
      OBA,
      WHIP,
      ERA
    })
  )

  const arr = careerArray.map((item) => ({
    ...item,
    season: item.season
  }))

  return arr
}

function transformPitcherEnglish(pitchers: Pitcher[]) {
  const pitcher = pitchers.map((item) => {
    const obj = {}
    const keys = Object.keys(PitcherEnglish)
    keys.forEach((key) => {
      if (isVaildKey(key, PitcherEnglish)) {
        const en = PitcherEnglish[key]
        obj[en] = item[key]
      }
    })
    return obj
  })

  return pitcher
}

function IPToPeopleCount(IP: number) {
  let totalPeople = 0
  const intPart = Math.floor(IP)
  const decimalPart = IP - intPart
  totalPeople += intPart * 3
  if (decimalPart > 0.2) {
    totalPeople += 3
  } else {
    totalPeople += decimalPart / 0.1
  }

  return totalPeople
}

function peopleToIP(people: number) {
  const intPart = Math.floor(people / 3)
  const decimalPart = people % 3
  return intPart + decimalPart * 0.1
}

function ERAfunc(ER: number, IP: number) {
  return (ER % IP) * 9
}

function getPitcherGameLength(pitcher: Pitcher[]) {
  let length = 0
  pitcher.forEach((item) => {
    if (item.position === 'P') {
      length++
    }
  })
  return length
}
// export function getplayer(sheetId: string, player: string) {
//   const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${player}?key=${key}`
//   return fetch(sheetUrl).then((res) => res.json())
// }
