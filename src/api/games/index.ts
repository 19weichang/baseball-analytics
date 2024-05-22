import * as xlsx from 'xlsx'
import { readWorkbookFromRemoteFile } from '../../utils/xlsx'
import { utils } from 'xlsx'
import { Game } from './types'

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
  return game
}
