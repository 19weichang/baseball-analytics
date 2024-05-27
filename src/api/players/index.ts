// import { read } from '../../utils/xlsx'
import * as xlsx from 'xlsx'
import { readWorkbookFromRemoteFile } from '../../utils/xlsx'
import { Player, PlayerEnglish, Hitter, HitterEnglish } from './types'
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
    const SBP = item.SBP

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
    result[parseInt(season)].SBP += SBP / gameLength
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
        SBP
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
      SBP
    })
  )
  const arr = careerArray.map((item) => ({
    ...item,
    season: item.season
  }))
  return arr
  // return transformHitterEnglish(arr) as Hitter[]
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

// export function getplayer(sheetId: string, player: string) {
//   const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${player}?key=${key}`
//   return fetch(sheetUrl).then((res) => res.json())
// }
