// import { read } from '../../utils/xlsx'
import * as xlsx from 'xlsx'
import { readWorkbookFromRemoteFile } from '../../utils/xlsx'
import { Player, PlayerEnglish, PlayerCareer } from './types'
import { utils } from 'xlsx'

const key = import.meta.env.VITE_GOOGLE_API_KEY

export async function getPlayers(sheetId: string) {
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

export async function getplayer(sheetId: string, player: string) {
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=xlsx`
  const file = new Promise((resolve) => {
    const callback = (workbook: xlsx.WorkBook) => {
      const sheet = workbook.Sheets[player]
      const json = utils.sheet_to_json(sheet)
      resolve(json)
    }
    readWorkbookFromRemoteFile(sheetUrl, callback)
  })
  const playerInfo: Player[] = (await file) as Player[]
  return playerInfo[0]
}

export async function getplayerCareer(sheetId: string, player: string) {
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=xlsx`
  const file = new Promise((resolve) => {
    const callback = (workbook: xlsx.WorkBook) => {
      const sheet = workbook.Sheets[player]
      const json = utils.sheet_to_json(sheet)
      resolve(json)
    }
    readWorkbookFromRemoteFile(sheetUrl, callback)
  })
  const playerInfo: PlayerCareer[] = (await file) as PlayerCareer[]
  const result: PlayerCareer[] = []
  for (const key in playerInfo) {
    const item = playerInfo[key]
    const season = item.season
    const PA = item.PA
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
    const AVG = item.AVG
    const OBP = item.OBP
    const SLG = item.SLG
    const OPS = item.OPS

    if (!result[season]) {
      result[season] = {
        season: 0,
        PA: 0,
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
        AVG: 0,
        OBP: 0,
        SLG: 0,
        OPS: 0
      }
    }

    result[season].PA += PA
    result[season].SingleB += SingleB
    result[season].DoubleB += DoubleB
    result[season].TripleB += TripleB
    result[season].HR += HR
    result[season].RBI += RBI
    result[season].R += R
    result[season].BB += BB
    result[season].SO += SO
    result[season].SF += SF
    result[season].SH += SH
    result[season].ERRCH += ERRCH
    result[season].AVG += AVG
    result[season].OBP += OBP
    result[season].SLG += SLG
    result[season].OPS += OPS
  }

  const careerArray = Object.entries(result).map(
    ([
      season,
      {
        PA,
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
        AVG,
        OBP,
        SLG,
        OPS
      }
    ]) => ({
      season,
      PA,
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
      AVG,
      OBP,
      SLG,
      OPS
    })
  )
  const arr = careerArray.map((item) => ({
    ...item,
    season: Number(item.season)
  }))

  return arr
}
