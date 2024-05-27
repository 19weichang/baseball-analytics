import * as xlsx from 'xlsx'
import { readWorkbookFromRemoteFile } from '../../utils/xlsx'
import { utils } from 'xlsx'
import { Game, GameEnglish } from './types'

const sheetId = import.meta.env.VITE_GOOGLE_SHEET_DOC_ID

export async function getGame(player: string) {
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=xlsx`
  const file = new Promise((resolve) => {
    const callback = (workbook: xlsx.WorkBook) => {
      const sheet = workbook.Sheets[player]
      const json = utils.sheet_to_json(sheet)
      resolve(json)
    }
    readWorkbookFromRemoteFile(sheetUrl, callback)
  })
  const game: Game[] = (await file) as Game[]
  // return game
  return transformEnglish(game) as Game[]
}

export function isVaildKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return key in object
}

export function transformEnglish(game: Game[]) {
  const player = game.map((item) => {
    const obj = {}
    const keys = Object.keys(GameEnglish)
    keys.forEach((key) => {
      if (isVaildKey(key, GameEnglish)) {
        const en = GameEnglish[key]
        obj[en] = item[key]
      }
    })
    return obj
  })

  return player
}

export async function getGameByType(player: string, type: string) {
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=xlsx`
  const file = new Promise((resolve) => {
    const callback = (workbook: xlsx.WorkBook) => {
      const sheet = workbook.Sheets[player]
      const json = utils.sheet_to_json(sheet)
      resolve(json)
    }
    readWorkbookFromRemoteFile(sheetUrl, callback)
  })
  const gameChinese: Game[] = (await file) as Game[]
  const game = transformEnglish(gameChinese) as Game[]
  const typeGame = game.filter((item) => item.gameType === type)
  for (let i = 0; i < typeGame.length; i++) {
    typeGame[i].season = typeGame[i].season.toString()
  }
  return typeGame
}
