import * as xlsx from 'xlsx'
import { readWorkbookFromRemoteFile } from '../../utils/xlsx'
import { utils } from 'xlsx'

const gameSheetId = import.meta.env.VITE_SHEET_GAME_ID

export function getGame(game: string) {
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${gameSheetId}/export?format=xlsx`
  const file = new Promise((resolve) => {
    const callback = (workbook: xlsx.WorkBook) => {
      const sheet = workbook.Sheets[game]
      const json = utils.sheet_to_json(sheet)
      resolve(json)
    }
    readWorkbookFromRemoteFile(sheetUrl, callback)
  })
  return file
}
