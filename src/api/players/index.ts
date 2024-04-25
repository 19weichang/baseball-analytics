// import { read } from '../../utils/xlsx'
import * as xlsx from 'xlsx'
import { readWorkbookFromRemoteFile } from '../../utils/xlsx'
import { Player, PlayerEnglish } from './types'
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
